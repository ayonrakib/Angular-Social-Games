const express = require("express");
const app = express();
const cors = require("cors");
app.use(cors());
app.use(express.json());
const routerFile = require("./router");
const userRoutes = require("./router/user");
const db = require("./mariadb");
import winston from "winston";
import expressWinston from "express-winston";
const port = 3000;

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

const logger = winston.createLogger({
  transports: [new winston.transports.Console()],
});

logger.add(
  new winston.transports.Console({
    format: winston.format.simple(),
  })
);

logger.info("winston logger on server file!");

app.use("/", routerFile);

app.use("/", userRoutes);

app.listen(3000, () => {
  console.log(`Example app listening on port ${port}`);
});
