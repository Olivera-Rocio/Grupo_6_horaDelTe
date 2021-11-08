'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {

    await queryInterface.bulkInsert('Categories', [
      {
        name: 'Tazas con frases',
       createdAt: new Date
      },
      {
        name: 'Taza de cerámica',
       createdAt: new Date
      },
      {
        name: 'Teteras',
       createdAt: new Date
       },
       {
        name: 'Azucareras',
       createdAt: new Date
       }
    ], {});

  },

  down: async (queryInterface, Sequelize) => {
    
    await queryInterface.bulkDelete('Categories', null, {});

  }
};
