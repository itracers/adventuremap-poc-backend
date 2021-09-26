'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('paymentMethods', [{
      name: 'Paysera',
      slug: 'paysera'
    }]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('paymentMethods');
  }
};
