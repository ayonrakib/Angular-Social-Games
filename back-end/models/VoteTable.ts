import DataTypes from "sequelize";
const sequelize = require("../mariadb");

const Vote_Table = sequelize.define(
  "vote_tables",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allownull: false,
    },
    pollId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
    },
    voteType: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: false,
    createdAt: false,
    updatedAt: false,
  }
);

export default Vote_Table;
