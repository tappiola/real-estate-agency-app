const Sequelize = require('sequelize');

const sequelize = require('../util/database');

const Property = sequelize.define('property', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  title: Sequelize.STRING,
  description: Sequelize.STRING,
  longitude: Sequelize.FLOAT,
  latitude: Sequelize.FLOAT
});

module.exports = Property;
