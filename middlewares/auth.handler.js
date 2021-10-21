const boom = require('@hapi/boom');

const { apiKey } = require('../config/keys');

const checkApiKey = (req, res, next) => {

    const apiPass = req.headers['api'];

    apiPass == apiKey
        ? next()
        : next(boom.unauthorized());

};

//Unico: permiso unicamente admin.
const checkAdminRole = (req, res, next) => {

    const { id, role } = req.user;

    role == 'admin'
        ? next()
        : next(boom.unauthorized());

};

//Personalizado: permisos para varios roles. Función closure ->
const checkRoles = (...roles) => {
    return (req, res, next) => {

        const { id, role } = req.user;

        roles.includes(role)
            ? next()
            : next(boom.unauthorized());

    };
};

module.exports = { checkApiKey, checkAdminRole, checkRoles };