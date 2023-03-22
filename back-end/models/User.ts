const { DataTypes } = require('sequelize');
const sequelizeForUser = require('../mariadb');

const User = sequelizeForUser.define('users', {
    id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true,
        allownull: false
    },
    firstName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    lastName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    session: {
        type: DataTypes.STRING
    },
    salt:{
        type: DataTypes.STRING
    },
    role: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "player"
    }
},
{
  timestamps: false,
  createdAt: false,
  updatedAt: false,      
})

module.exports = User;