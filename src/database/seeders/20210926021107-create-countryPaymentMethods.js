'use strict';

const fs = require('fs');
const path = require('path');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const payseraAvailabilityData = JSON.parse(fs.readFileSync(path.join(__dirname, './data/payseraAvailability.json')).toString());
    const countriesData = await queryInterface.sequelize.query('SELECT id, country_code_3 FROM countries WHERE country_code_3 IS NOT NULL', {
      type: queryInterface.sequelize.QueryTypes.SELECT
    });
    const countriesIdsMapped = countriesData.reduce((prev, next) => {
      prev[next.country_code_3] = next.id;
      return prev;
    }, { });

    const paysera = await queryInterface.sequelize.query("SELECT id FROM paymentMethods WHERE slug = 'paysera'", {
      type: queryInterface.sequelize.QueryTypes.SELECT
    });
    
    let result = [];
    for (let payseraAvailabilityItem of payseraAvailabilityData) {
      if (countriesIdsMapped[payseraAvailabilityItem.country_code3]) {
        result.push({
          country_id: countriesIdsMapped[payseraAvailabilityItem.country_code3],
          payment_method_id: paysera[0].id,
          requires_additional_verification: payseraAvailabilityItem.requires_additional_verification
        });
      }
    }

    await queryInterface.bulkInsert('countryPaymentMethods', result);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('countryPaymentMethods');
  }
};
