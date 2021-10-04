'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn('countryFeatures', 'value', {
      type: Sequelize.TEXT,
      allowNull: true
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn('countryFeatures', 'value', {
      type: Sequelize.STRING,
      allowNull: true
    });
  }
};
