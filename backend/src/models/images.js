const Sequelize = require('sequelize');

const sequelize = require('../util/database');

const Image = sequelize.define('image', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    link: Sequelize.STRING,
    position: Sequelize.INTEGER
}, {
    timestamps: false
});

module.exports = Image;
