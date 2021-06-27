import chalk from "chalk";

const log = console.log;
const ERROR_COLOR = chalk.bgRed.white.bold;
const SUCCESS_COLOR = chalk.greenBright.underline;

export const ERROR = (message) => {
  log(ERROR_COLOR(message));
};

export const SUCCESS = (message) => {
  log(SUCCESS_COLOR(message));
};
