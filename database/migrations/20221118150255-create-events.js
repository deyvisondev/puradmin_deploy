'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('events', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      client_id: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: "clients"
          },
          key: "id"
        },
        allowNull: false
      },
      product_id: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: "products"
          },
          key: "id"
        },
        allowNull: false
      },
      issue_id: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: "event_issues"
          },
          key: "id"
        },
        allowNull: false
      },
      observation: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      date: {
        type: Sequelize.STRING,
        allowNull: false
      },
      reposition: {
        type: Sequelize.ENUM('1', '0'),
        allowNull: false
      },
      section_id: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: "sections"
          },
          key: "id"
        },
        allowNull: false
      },
      user_id: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: "users"
          },
          key: "id"
        },
        allowNull: false
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP")
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP")
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('events');
  }
};