'use strict';

const { CUSTOMER_TABLE, CustomerSchema } = require("../models/customer.model");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable(CUSTOMER_TABLE, CustomerSchema);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.drop(CUSTOMER_TABLE);
  }
};
