'use strict';

const { ProductSchema, PRODUCT_TABLE } = require("../models/product.model");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable(PRODUCT_TABLE, ProductSchema);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable(PRODUCT_TABLE);
  }
};
