const { Sequelize } = require('sequelize');
const config = require('../config');

const sequelize = new Sequelize(config.db.database, config.db.username, config.db.password, {
  host: config.db.host,
  dialect: 'oracle',
  dialectOptions: config.db.dialectOptions
});

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Importa los modelos aquí
db.Factura = require('./factura')(sequelize, Sequelize);

module.exports = db;
