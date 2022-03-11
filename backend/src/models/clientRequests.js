const Sequelize = require('sequelize');

const sequelize = require('../util/database');

const ClientRequest = sequelize.define('client_requests', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    firstName: Sequelize.STRING,
    lastName: Sequelize.STRING,
    email: Sequelize.STRING,
    phone: Sequelize.STRING,
});

module.exports = ClientRequest;
