import NodeCache from "node-cache";
import dotenv from "dotenv";
import { blackList_User } from "../fixedWindowRateLimiter/fixedWindowRateLimiter.js";

dotenv.config();

const MAX_SLIDING_WINDOW_SIZE = process.env.SLIDING_WINDOW_SIZE || 3600;
const MAX_REQUSET_PER_WINDOW = process.env.REQUEST || 3000;

const storage = new NodeCache();

const updateWindow = () => {
  const currentWindow = storage.get("currentWindow");

  const newWindow = {
    startTime: currentWindow.endTime,
    endTime: currentWindow.endTime + MAX_SLIDING_WINDOW_SIZE,
    ticketCount: 0,
  };

  storage.mset([
    { key: "previousWindow", val: currentWindow },
    { key: "currentWindow", val: newWindow },
  ]);
};

const init = () => {
  const currentTimeStamp = Math.round(new Date().getTime() / 1000);

  const previousWindow = {
    startTime: currentTimeStamp - MAX_SLIDING_WINDOW_SIZE,
    endTime: currentTimeStamp,
    ticketCount: 0,
  };

  const currentWindow = {
    startTime: currentTimeStamp,
    endTime: currentTimeStamp + MAX_SLIDING_WINDOW_SIZE,
    ticketCount: 0,
  };

  storage.mset([
    { key: "isWindowPresent", val: true },
    { key: "previousWindow", val: previousWindow },
    { key: "currentWindow", val: currentWindow },
  ]);

  setInterval(updateWindow, MAX_SLIDING_WINDOW_SIZE * 1000);
};

const slidingWindowRateLimiter = (req, res, next) => {
  if (blackList_User.has(req.ip)) {
    res
      .status(401)
      .json({ message: "You are not allowed to access the web app" });
    return;
  }

  if (!storage.get("isWindowPresent")) init();

  const currentTimeStamp = Math.round(new Date().getTime() / 1000);

  let { currentWindow, previousWindow } = storage.mget([
    "currentWindow",
    "previousWindow",
  ]);

  /**
   * approxRate  = (ticketcount in previous window)*(size of current window) + ticket count in current window
   * Check for the formula
   * https://nlogn.in/design-a-scalable-rate-limiting-algorithm-system-design/
   */

  const slidingWindowSize =
    (MAX_SLIDING_WINDOW_SIZE - currentTimeStamp + currentWindow.startTime) /
    MAX_SLIDING_WINDOW_SIZE;

  const approxRate =
    previousWindow.ticketCount * slidingWindowSize + currentWindow.ticketCount;

  if (approxRate < MAX_REQUSET_PER_WINDOW) {
    currentWindow.ticketCount++;
    storage.set("currentWindow", currentWindow);
    next();
  } else {
    res
      .status(429)
      .json({ message: "Too many request.Please try again later" });
  }
};

export default slidingWindowRateLimiter;
