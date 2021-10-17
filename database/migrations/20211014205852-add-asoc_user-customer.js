'use strict';

const { CUSTOMER_TABLE, CustomerSchema } = require("../models/customer.model");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn(CUSTOMER_TABLE, 'user_id', CustomerSchema.userId);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn(CUSTOMER_TABLE, 'user_id');
  }
};
