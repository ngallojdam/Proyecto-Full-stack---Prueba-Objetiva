module.exports = {
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
};