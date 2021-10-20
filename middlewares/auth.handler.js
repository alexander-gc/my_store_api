const boom = require('@hapi/boom');

const { apiKey } = require('../config/keys');

const checkApiKey = (req, res, next) => {

    const apiKey = req.headers['api'];

    apiKey == '123'
        ? next()
        : next(boom.unauthorized());

};

module.exports = { checkApiKey };