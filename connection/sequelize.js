const { Sequelize } = require('sequelize');

const { dbUser, dbHost, dbName, dbPassword, dbPort } = require('../config/keys');
const setupModels = require('../database/models/index');

//const URI = `postgres://${dbUser}:${dbPassword}@${dbHost}:${dbPort}/${dbName}`;

const sequelize = new Sequelize(dbName, dbUser, dbPassword, {
    host: dbHost,
    port: dbPort,
    dialect: 'postgres',
    logging: true
});

setupModels(sequelize);

//sequelize.sync(); //Sincroniza los esquemas (creados en models) para crearse. Aunque no es recomendado en prod.

module.exports = sequelize;