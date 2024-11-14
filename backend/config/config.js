/*{
  "development": {
    "username": "root",
    "password": null,
    "database": "database_development",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "test": {
    "username": "root",
    "password": null,
    "database": "database_test",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "production": {
    "username": "root",
    "password": null,
    "database": "database_production",
    "host": "127.0.0.1",
    "dialect": "mysql"
  }
}*/

module.exports = {
    development: {
      username: 'root',
      password: 'Nico.0411',
      database: 'db_animals',
      host: '127.0.0.1',
      dialect: 'mysql',
    },
    test: {
      username: 'root',
      password: 'Nico.0411',
      database: 'db_animals_test',
      host: '127.0.0.1',
      dialect: 'mysql',
    },
    production: {
      username: 'root',
      password: 'Nico.0411',
      database: 'db_animals_prod',
      host: '127.0.0.1',
      dialect: 'mysql',
    },
  };
  
