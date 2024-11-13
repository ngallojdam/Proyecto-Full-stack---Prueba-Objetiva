/*module.exports = {
    HOST: "localhost",
    USER: "root",
    PASSWORD: "Nico.0411",
    DB: "db_animals",
    dialect: "mysql",
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,         // Se configura Sequelize para utilizar MySQL
        idle: 10000
    }
};*/

require('dotenv').config();

module.exports = {
    development: {
        username: process.env.MYSQL_USER,
        password: process.env.MYSQL_PASSWORD,
        database: process.env.MYSQL_DATABASE,
        host: process.env.MYSQL_HOST,
        dialect: 'mysql'
    },
    test: {
        username: process.env.MYSQL_USER,
        password: process.env.MYSQL_PASSWORD,
        database: process.env.MYSQL_DATABASE,
        host: process.env.MYSQL_HOST,
        dialect: 'mysql'
    },
    production: {
        username: process.env.MYSQL_USER,
        password: process.env.MYSQL_PASSWORD,
        database: process.env.MYSQL_DATABASE,
        host: process.env.MYSQL_HOST,
        dialect: 'mysql'
    }
}