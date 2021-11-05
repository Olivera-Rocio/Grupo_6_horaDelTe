'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Users', {
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
      email: {
        type: Sequelize.STRING(45),
        allowNull: false
      },
      phone: {
        type: Sequelize.STRING
      },
      password: {
        type: Sequelize.STRING(100),
        allowNull: false
      },
      avatar: {
        type: Sequelize.STRING(45),
        defaultValue:'default.png'
      },
      rolId: {
        type: Sequelize.INTEGER,
        defaultValue: 1,
        references :{
          model : {
            tableName : 'Rols'
          },
          key : 'id'
        }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        type: Sequelize.DATE
      },
      deleteAt:{
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Users');
  }
};