const Sequelize = require('sequelize');

const sequelize = new Sequelize('flats', 'root', 'snorlax', {
  dialect: 'mariadb',
  host: 'db'
});

module.exports = sequelize;
