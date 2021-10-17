const { Pool } = require('pg');

const { dbUser, dbHost, dbName, dbPassword, dbPort } = require('../config/keys');

const URI = `postgres://${dbUser}:${dbPassword}@${dbHost}:${dbPort}/${dbName}`;

//No importa la cantidad de queries, se generará un solo cliente que se va a ir compartiendo.
//Con la conexión simple, se generaba un cliente por cada queries.

const pool = new Pool({ connectionString: URI });

module.exports = pool;