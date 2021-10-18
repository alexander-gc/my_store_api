'use strict';

const { PRODUCT_TABLE } = require("../models/product.model");
const { DataTypes } = require('sequelize');
const { CATEGORY_TABLE } = require("../models/category.model");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn(PRODUCT_TABLE, 'category_id', {
      allowNull: false,
      type: DataTypes.INTEGER,
      field: 'category_id',
      references: {
        model: CATEGORY_TABLE,
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn(PRODUCT_TABLE, 'category_id');
  }
};
