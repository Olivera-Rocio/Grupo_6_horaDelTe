'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Carts', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      orderId: {
        type: Sequelize.INTEGER,
        references :{
          model :{
            tableName : 'Orders'
          },
          key : 'id'
        }
      },
      productId: {
        type: Sequelize.INTEGER,
        references :{
          model :{
            tableName : 'Products'
          },
          key : 'id'
        }
      },
      UserId: {
        type: Sequelize.INTEGER,
        references :{
          model :{
            tableName : 'Users'
          },
          key : 'id'
        }
      },
      quantity: {
        type: Sequelize.INTEGER
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
    await queryInterface.dropTable('Carts');
  }
};