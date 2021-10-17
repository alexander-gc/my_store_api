const boom = require('@hapi/boom');

const { models } = require('../connection/sequelize');

class CustomerService {
    constructor() { }

    async create(data) {
        const { firstName, lastName, phone, userId } = data;

        //const customerExists = await models.Customer.findOne({ where: { userId } });
        //if (customerExists) throw boom.conflict("The userId is already occupied by someone else");

        const userIdExists = await models.User.findByPk(userId);
        if (!userIdExists) throw boom.notFound("User does not exist in the database");

        const newCustomer = await models.Customer.create({
            firstName,
            lastName,
            phone,
            userId
        });

        return newCustomer;
    }

    async find() {
        const customers = await models.Customer.findAll({
            include: ['user']
        });
        return customers;
    }

    async findOne(id) {
        const customer = await models.Customer.findByPk(id, {
            include: ['user']
        });

        if (!customer) throw boom.notFound("Customer not found in the database");

        return customer;
    }

    async update(id, changes) {
        const { firstName, lastName, phone } = changes;

        const customer = await models.Customer.findByPk(id);

        if (!customer) throw boom.notFound("Customer not found in the database");

        customer.update({
            firstName,
            lastName,
            phone
        });

        return customer;
    }

    async delete(id) {
        const customer = await models.Customer.findByPk(id);

        if (!customer) throw boom.notFound("Customer not found in the database");

        await customer.destroy();

        return "Customer deleted successfully: " + id;
    }
}

module.exports = CustomerService;
