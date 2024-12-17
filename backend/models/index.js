// backend/models/index.js
const { Sequelize } = require('sequelize');
const dbConfig = require('../config/db.config');

// Crea la instancia de Sequelize
const sequelize = new Sequelize(
  dbConfig.DB,
  dbConfig.USER,
  dbConfig.PASSWORD,
  {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    pool: {
      max: dbConfig.pool.max,
      min: dbConfig.pool.min,
      acquire: dbConfig.pool.acquire,
      idle: dbConfig.pool.idle,
    },
  }
);

const db = {};

// Importa los modelos
db.User = require('./user.model.js')(sequelize, Sequelize.DataTypes);

// Agrega otros modelos si los tienes
db.Animal = require('./animal.model.js')(sequelize, Sequelize.DataTypes);

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
