const Sequelize = require('sequelize');

const sequelize = require('../util/database');

const Property = sequelize.define('property', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  price: Sequelize.INTEGER,
  title: Sequelize.TEXT,
  description: Sequelize.TEXT,
  address: Sequelize.STRING,
  bedroomCount: Sequelize.INTEGER,
  bathroomCount: Sequelize.INTEGER,
  longitude: Sequelize.FLOAT,
  latitude: Sequelize.FLOAT,
  floorPlan: Sequelize.STRING
});

module.exports = Property;
