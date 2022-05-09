const { DataTypes } = require('sequelize');
const sequelize = require("../db.js")


const Badge = sequelize.define('Badge', {
    id: {
        type: DataTypes.INTEGER,
        unique:true,
        primaryKey: true,
        autoIncrement: true
    },
    autorisation: {
        type: DataTypes.BOOLEAN,
    },
    badgeAdress:{
        type: DataTypes.STRING,
        allowNull: false,
        unique:true,
    },
    autorisation: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    },
    prenom: {
        type: DataTypes.STRING,
        allowNull: true
    },
    nom: {
        type: DataTypes.STRING,
        allowNull: true
    }
});

module.exports = Badge;
