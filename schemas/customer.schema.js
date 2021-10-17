const Joi = require('joi');

const id = Joi.number().integer();
const firstName = Joi.string().min(3).max(15);
const lastName = Joi.string().min(5).max(20);
const phone = Joi.string() //. equal(10);
const userId = Joi.number().integer();

const createCustomerSchema = Joi.object({
    firstName: firstName.required(),
    lastName: lastName.required(),
    phone: phone.required(),
    userId: userId.required()
});

const updateCustomerSchema = Joi.object({
    firstName: firstName,
    lastName: lastName,
    phone: phone
});

const getCustomerSchema = Joi.object({
    id: id.required(),
});

module.exports = { createCustomerSchema, updateCustomerSchema, getCustomerSchema }
