const { Sequelize } = require('sequelize');

const { dbUser, dbHost, dbName, dbPassword, dbPort, isProd, dbUrl } = require('../config/keys');
const setupModels = require('../database/models/index');

//const URI = `postgres://${dbUser}:${dbPassword}@${dbHost}:${dbPort}/${dbName}`;

const options = {
    host: dbHost,
    port: dbPort,
    dialect: 'postgres',
    logging: true
}

if (isProd) {
    options.dialectOptions = {
        ssl: {
            rejectUnauthorized: false
        }
    }
};

const sequelize = new Sequelize(dbUrl, options);

setupModels(sequelize);

//sequelize.sync(); //Sincroniza los esquemas (creados en models) para crearse. Aunque no es recomendado en prod.

module.exports = sequelize;