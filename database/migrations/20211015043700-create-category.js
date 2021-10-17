'use strict';

const { CategorySchema, CATEGORY_TABLE } = require("../models/category.model");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable(CATEGORY_TABLE, CategorySchema);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable(CATEGORY_TABLE);
  }
};
