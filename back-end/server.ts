const express = require("express");
const app = express();
const cors = require("cors");
app.use(cors());
app.use(express.json());
const routerFile = require("./router");
const userRoutes = require("./router/user");
const imageRoutes = require("./router/image");
const db = require("./mariadb");
import winston from "winston";
import expressWinston from "express-winston";
const multer = require("multer");
import path from "path";
import bodyParser from "body-parser";
import pino from "pino";
const port = 3000;
import { Colorette, red } from "colorette";
const redColor: Colorette = {
  red: red,
  reset: function (text: string | number): string {
    throw new Error("Function not implemented.");
  },
  bold: function (text: string | number): string {
    throw new Error("Function not implemented.");
  },
  dim: function (text: string | number): string {
    throw new Error("Function not implemented.");
  },
  italic: function (text: string | number): string {
    throw new Error("Function not implemented.");
  },
  underline: function (text: string | number): string {
    throw new Error("Function not implemented.");
  },
  inverse: function (text: string | number): string {
    throw new Error("Function not implemented.");
  },
  hidden: function (text: string | number): string {
    throw new Error("Function not implemented.");
  },
  strikethrough: function (text: string | number): string {
    throw new Error("Function not implemented.");
  },
  black: function (text: string | number): string {
    throw new Error("Function not implemented.");
  },
  green: function (text: string | number): string {
    throw new Error("Function not implemented.");
  },
  yellow: function (text: string | number): string {
    throw new Error("Function not implemented.");
  },
  blue: function (text: string | number): string {
    throw new Error("Function not implemented.");
  },
  magenta: function (text: string | number): string {
    throw new Error("Function not implemented.");
  },
  cyan: function (text: string | number): string {
    throw new Error("Function not implemented.");
  },
  white: function (text: string | number): string {
    throw new Error("Function not implemented.");
  },
  gray: function (text: string | number): string {
    throw new Error("Function not implemented.");
  },
  bgBlack: function (text: string | number): string {
    throw new Error("Function not implemented.");
  },
  bgRed: function (text: string | number): string {
    throw new Error("Function not implemented.");
  },
  bgGreen: function (text: string | number): string {
    throw new Error("Function not implemented.");
  },
  bgYellow: function (text: string | number): string {
    throw new Error("Function not implemented.");
  },
  bgBlue: function (text: string | number): string {
    throw new Error("Function not implemented.");
  },
  bgMagenta: function (text: string | number): string {
    throw new Error("Function not implemented.");
  },
  bgCyan: function (text: string | number): string {
    throw new Error("Function not implemented.");
  },
  bgWhite: function (text: string | number): string {
    throw new Error("Function not implemented.");
  },
  blackBright: function (text: string | number): string {
    throw new Error("Function not implemented.");
  },
  redBright: function (text: string | number): string {
    throw new Error("Function not implemented.");
  },
  greenBright: function (text: string | number): string {
    throw new Error("Function not implemented.");
  },
  yellowBright: function (text: string | number): string {
    throw new Error("Function not implemented.");
  },
  blueBright: function (text: string | number): string {
    throw new Error("Function not implemented.");
  },
  magentaBright: function (text: string | number): string {
    throw new Error("Function not implemented.");
  },
  cyanBright: function (text: string | number): string {
    throw new Error("Function not implemented.");
  },
  whiteBright: function (text: string | number): string {
    throw new Error("Function not implemented.");
  },
  bgBlackBright: function (text: string | number): string {
    throw new Error("Function not implemented.");
  },
  bgRedBright: function (text: string | number): string {
    throw new Error("Function not implemented.");
  },
  bgGreenBright: function (text: string | number): string {
    throw new Error("Function not implemented.");
  },
  bgYellowBright: function (text: string | number): string {
    throw new Error("Function not implemented.");
  },
  bgBlueBright: function (text: string | number): string {
    throw new Error("Function not implemented.");
  },
  bgMagentaBright: function (text: string | number): string {
    throw new Error("Function not implemented.");
  },
  bgCyanBright: function (text: string | number): string {
    throw new Error("Function not implemented.");
  },
  bgWhiteBright: function (text: string | number): string {
    throw new Error("Function not implemented.");
  },
};
const scriptName = path.basename(__filename);
const formatters = {
  bindings(bindings: any) {
    return {
      pid: bindings.pid,
      hostname: bindings.hostname,
      methodName: "ayon",
      fileName: scriptName,
      node_version: process.version,
    };
  },
};

// const pretty = require("pino-pretty");
// const stream = pretty({
//   colorize: false,
//   formatters: formatters,
//   messageFormat: "{fileName} - {pid} - url:{req.url}",
//   customPrettifiers: {
//     messageFormat: "{fileName} - {pid} - url:{req.url}",
//     // The argument for this function will be the same
//     // string that's at the start of the log-line by default:
//     time: (timestamp: any) => `current time: ${timestamp}`,

//     // The argument for the level-prettifier may vary depending
//     // on if the levelKey option is used or not.
//     // By default this will be the same numerics as the Pino default:
//     level: (logLevel: any) => `LEVEL: ${logLevel}`,

//     // other prettifiers can be used for the other keys if needed, for example
//     // hostname: (hostname: any) => colorGreen(hostname),
//     // pid: (pid: any) => colorRed(pid),
//     colorize: redColor.red,
//     name: (name: any) => `file name: ${name}`,
//     customColors: "err:red,info:yellow",
//     caller: (caller: any) => `caller name: ${caller}`,
//     node_version: (nodeVersion: any) => `current node version: ${nodeVersion}`,
//   },
// });

// import { blue } from "colorette";

// import { createColors } from "colorette";

// const { blue } = createColors({ useColor: false });

// import { blue, bold, underline } from "colorette";

// console.log(
//   blue("I'm blue"),
//   bold(blue("da ba dee")),
//   underline(bold(blue("da ba daa")))
// );

// blue("I amm blue in blue method!");
//=> \x1b[34mI'm blue\x1b[39m
// const logger = pino({
//   prettyPrint: {
//     // Adds the filename property to the message
//     messageFormat: '{filename}: {msg}',

//     // need to ignore 'filename' otherwise it appears beneath each log
//     ignore: 'pid,hostname,filename',
//   },
// }).child({ filename: path.basename(__filename) });

const logger = pino({
  formatters: formatters,
  msgPrefix: "this is a message prefix!",
});
logger.info("server started with pino pretty!");

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.use(
  expressWinston.logger({
    transports: [new winston.transports.Console()],
    format: winston.format.combine(
      winston.format.colorize(),
      winston.format.json()
    ),
    meta: false,
    msg: "HTTP  ",
    expressFormat: true,
    colorize: false,
    ignoreRoute: function (req, res) {
      return false;
    },
  })
);

app.use("/", routerFile);

app.use("/", userRoutes);

app.use("/", imageRoutes);

app.listen(3000, () => {
  console.log(`Example app listening on port ${port}`);
});
function colorGreen(hostname: any) {
  throw new Error("Function not implemented.");
}

function colorRed(pid: any) {
  throw new Error("Function not implemented.");
}

function colorBlue(name: any) {
  throw new Error("Function not implemented.");
}

function colorCyan(caller: any) {
  throw new Error("Function not implemented.");
}
