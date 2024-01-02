const Sequelize = require('sequelize');
const constants = require('../constants');

const sequelize = new Sequelize(
    constants.DB_NAME,
    constants.DB_USERNAME,
    constants.DB_PASSWORD, {
        dialect: 'mariadb',
        host: constants.DB_HOST,
        port: constants.DB_PORT,
        dialectOptions: {
            ssl: {
                rejectUnauthorized: false
            },
        }
    });

module.exports = sequelize;
