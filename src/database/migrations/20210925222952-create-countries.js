'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('countries', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },

      country_code_2: {
        type: Sequelize.STRING,
        allowNull: false
      },

      country_code_3: {
        type: Sequelize.STRING,
        allowNull: true
      },

      phone_code: {
        type: Sequelize.STRING,
        allowNull: false
      },

      name: {
        type: Sequelize.STRING,
        validate: {
          notNull: true
        }
      },

      created_at: {
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        type: Sequelize.DATE
      },
      updated_at: {
        allowNull: true,
        type: Sequelize.DATE
      },
      deleted_at: {
        allowNull: true,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface) => {
    return queryInterface.dropTable('countries');
  }
};
