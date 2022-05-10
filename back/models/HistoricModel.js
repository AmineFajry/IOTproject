const { DataTypes } = require('sequelize');
const sequelize = require("../db.js")


const historic = sequelize.define('Historic', {
    id: {
        type: DataTypes.INTEGER,
        unique:true,
        primaryKey: true,
        autoIncrement: true
    }
});

module.exports = historic;
