const { DataTypes } = require('sequelize');
const sequelize = require("../db.js")


const MicroController = sequelize.define('MicroController', {
    id: {
        type: DataTypes.INTEGER,
        unique:true,
        primaryKey: true,
        autoIncrement: true
    },
    seuilLuminosite: {
        type: DataTypes.STRING,
        allowNull: false
    },
    addrMac: {
        type: DataTypes.STRING,
        allowNull: true
    }
});

module.exports = MicroController;
