'use strict';

const { CUSTOMER_TABLE } = require("../models/customer.model");
const { DataTypes } = require('sequelize');
const { USER_TABLE } = require("../models/user.model");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn(CUSTOMER_TABLE, 'user_id', {
      field: 'user_id',
      allowNull: false,
      type: DataTypes.INTEGER,
      references: {
        model: USER_TABLE,
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn(CUSTOMER_TABLE, 'user_id');
  }
};
