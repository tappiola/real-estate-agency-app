const Sequelize = require('sequelize');
const constants = require('../constants');

const sequelize = new Sequelize(constants.DB_NAME, constants.DB_USERNAME, constants.DB_PASSWORD, {
    dialect: 'mariadb',
    host: constants.DB_HOST
});

module.exports = sequelize;
