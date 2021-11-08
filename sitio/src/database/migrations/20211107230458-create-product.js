'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Products', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING(45),
        allowNull: false
      },
      description: {
        type: Sequelize.STRING(500),
        allowNull: false
      },
      price: {
        type: Sequelize.DECIMAL(8,2),
        allowNull: false
      },
      discount: {
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      image: {
        type: Sequelize.STRING(45)
      },
      categoryId: {
        type: Sequelize.INTEGER,
        references: {
          model:{
            tableName: "Categories"
          },
          key: "id"
        }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        type: Sequelize.DATE,
        defaultValue: null
      },
      deletedAt: {
        type: Sequelize.DATE,
        defaultValue: null
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Products');
  }
};