const { dbUser, dbHost, dbName, dbPassword, dbPort, dbUrl } = require('../config/keys');

//const URI = `postgres://${dbUser}:${dbPassword}@${dbHost}:${dbPort}/${dbName}`;

module.exports = {
    development: {
        url: dbUrl,
        dialect: 'postgres',
    },
    production: {
        url: dbUrl,
        dialect: 'postgres',
        dialectOptions: {
            ssl: {
                rejectUnauthorized: false
            }
        }
    }
};