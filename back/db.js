const { Sequelize } = require('sequelize');
const dotEnv = require('dotenv').config()

const sequelize = new Sequelize(process.env.BASE_BDD,process.env.USER_BDD,process.env.PASSWORD_BDD,{
    host: process.env.HOST_BDD,
    dialect: 'mysql'
});
module.exports = sequelize