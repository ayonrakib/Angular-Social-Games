const { DataTypes } = require("sequelize");
const sequelizeForPoll = require("../mariadb");

const Poll = sequelizeForPoll.define(
  "polls",
  {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
      allownull: false,
    },
    pollDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    pollTime: {
      type: DataTypes.TIME,
      allowNull: false,
    },
    pollLocation: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    owner_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    timestamps: false,
    createdAt: false,
    updatedAt: false,
  }
);

module.exports = Poll;
export {};
