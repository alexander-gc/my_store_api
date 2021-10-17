const { Client } = require('pg');

const connection = async () => {

    try {

        const client = new Client({
            host: 'localhost',
            port: 5434,
            user: 'node',
            password: 'store123',
            database: 'my_store'
        });

        await client.connect();

        return client;
    } catch (error) {
        throw new Error(error.message);
    }

};

module.exports = connection;