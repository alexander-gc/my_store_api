'use strict';

const { USER_TABLE, UserSchema } = require("../models/user.model");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn(USER_TABLE, 'recovery_password', UserSchema.recoveryPassword);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn(USER_TABLE, 'recovery_password');
  }
};
