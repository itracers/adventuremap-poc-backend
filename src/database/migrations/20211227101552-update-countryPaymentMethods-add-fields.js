'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('countryPaymentMethods', 'currency', {
      type: Sequelize.STRING,
      allowNull: true,
      after: 'requires_additional_verification'
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('countryPaymentMethods', 'currency')
  }
};
