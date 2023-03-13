'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('daily_billings', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      date_billing: {
        type: Sequelize.DATE,
        allowNull: false
      },
      expected_billing: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false,
      defaultValue: 0.0,
      },
      effective_billing: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false
      },
      daily_lost: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false,
      defaultValue: 0.0,
      },
      credit_note: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false,
      defaultValue: 0.0,
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE
      }
      });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('daily_billings');
  }
};