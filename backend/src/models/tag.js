const Sequelize = require('sequelize');

const sequelize = require('../util/database');

const Tag = sequelize.define('tag', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    name: Sequelize.STRING
}, {
    timestamps: false
});

module.exports = Tag;
