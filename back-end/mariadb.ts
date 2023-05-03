console.log("mariadb connection file ran!");
require("dotenv").config();

const Sequelize = require("sequelize");

const sequelize = new Sequelize(
  process.env.DEV_DB_NAME,
  process.env.DEV_DB_USERNAME,
  process.env.DEV_DB_PASSWORD,
  {
    host: process.env.DEV_DB_HOST,
    dialect: "mariadb",
    sync: true,
  }
);

async function connect() {
  try {
    await sequelize.authenticate();
    console.log("Connection with Mariadb has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database: ", error);
  }
}

connect();

module.exports = sequelize;
