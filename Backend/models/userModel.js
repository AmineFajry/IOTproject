const { DataTypes } = require('sequelize');
const sequelize = require("../db.js")


const User = sequelize.define('User', {
    id: {
        type: DataTypes.INTEGER,
        unique:true,
        primaryKey: true,
        autoIncrement: true
    },
    email: {
        type: DataTypes.STRING,
        unique:true,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    token: {
        type: DataTypes.STRING,
        allowNull: true
    }
});

module.exports = User;
