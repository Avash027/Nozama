import NodeCache from "node-cache";
import dotenv from "dotenv";
dotenv.config();

const MAX_FIXED_WINDOW_SIZE = process.env.MAX_FIXED_WINDOW_SIZE || 3600;
const MAX_USER_REQUSET_PER_WINDOW =
  process.env.MAX_USER_REQUSET_PER_WINDOW || 2000;

const UserStore = new NodeCache();
const blackList = new NodeCache();

function clearWindow() {
  UserStore.flushAll();
  UserStore.set("isActive", true);
}

function init() {
  UserStore.set("isActive", true);
  setInterval(clearWindow, MAX_FIXED_WINDOW_SIZE * 1000);
}

export function fixedWindowRateLimiter(req, res, next) {
  if (!UserStore.has("isActive")) init();

  if (blackList.has(req.ip)) {
    res
      .status(401)
      .json({ message: "You are not allowed to access the web app" });
    return;
  }

  if (UserStore.has(req.ip)) UserStore.set(req.ip, UserStore.get(req.ip) + 1);
  else UserStore.set(req.ip, 1);

  if (UserStore.get(req.ip) > MAX_USER_REQUSET_PER_WINDOW) {
    blackList.set(req.ip, true);
    res
      .status(401)
      .json({ message: "You are not allowed to access the web app" });
    return;
  }

  next();
}

export const blackList_User = blackList;
