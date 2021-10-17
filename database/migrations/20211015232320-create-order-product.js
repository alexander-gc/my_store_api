'use strict';

const { ORDER_PRODUCT_TABLE, OrderProductSchema } = require("../models/order-product");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable(ORDER_PRODUCT_TABLE, OrderProductSchema);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable(ORDER_PRODUCT_TABLE);
  }
};
