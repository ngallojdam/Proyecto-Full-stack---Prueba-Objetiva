const { Sequelize } = require('sequelize');
const dbConfig = require('../config/db.config');

// Configuración de Sequelize
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

// Importar modelos
db.User = require('./user.model.js')(sequelize, Sequelize.DataTypes);
db.Animal = require('./animal.model.js')(sequelize, Sequelize.DataTypes); // Nota: db.Animal (mayúscula)

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
