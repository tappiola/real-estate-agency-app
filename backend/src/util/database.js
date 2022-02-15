const Sequelize = require('sequelize');

const sequelize = new Sequelize('flats', 'root', 'snorlax', {
  dialect: 'mariadb',
  host: 'db',
  // define: {
  //   timestamps: false
  // }
});

module.exports = sequelize;
