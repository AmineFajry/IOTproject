var { Sequelize } = require('sequelize');

var sequelize = new Sequelize(process.env.TABLE_BDD,process.env.USER_BDD,process.env.PASSWORD_BDD,{
    host: process.env.HOST_BDD,
    dialect:  'mysql'
});
module.exports = sequelize