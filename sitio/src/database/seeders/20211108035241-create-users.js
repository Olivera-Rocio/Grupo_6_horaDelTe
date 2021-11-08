'use strict';

const users = [
  {
     "name": "Valentina Alegre",
     "email": "valentinaalegre0715@gmail.com",
     "telefono": "1161632253",
     "password": "Z.nHzp6xfzFHHYYvA8omHaKQjoTOera",
     "rolId": 2,
     createdAt: new Date
  },
  {
     "name": "Olivera Magali",
     "email": "Oliveramagalir@gmail.com",
     "telefono": "3877440734",
     "password": "$2a$10$fgptL2L8Y3AYwFUUgV/uO.ICv5cDiGwE7fSgdGVUeGdijbr5dYGX6",
     "avatar": "avatar-1635446949727.png",
     "rolId": 2,
      createdAt: new Date
  },
  {
     "name": "natalia escobar",
     "email": "medaigualqueseafacil@gmail.com",
     "telefono": "111111111",
     "password": "$2a$10$Dm8aDIaz.PKvjGPkwpZeXe/OvZhvUSojQzHs/Ktc7UbqXF7xTSPtC",
     "avatar": "default.png",
     "rolId": 1,
      createdAt: new Date
  }
]

module.exports = {
  up: async (queryInterface, Sequelize) => {
   
    await queryInterface.bulkInsert('Users',users , {});
    
  },

  down: async (queryInterface, Sequelize) => {
    
    await queryInterface.bulkDelete('Users', null, {});
     
  }
};