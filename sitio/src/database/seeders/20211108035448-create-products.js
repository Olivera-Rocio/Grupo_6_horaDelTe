'use strict';

let products = [
    {
       "name": "Taza “Hoy es un buen día”",
       "description": "Taza con frase “Hoy es un buen día” en fondo celeste vitrificada. Capacidad de 250ml y medidas de 9cm alto x 7cm ancho.",
       "price": 1600,
       "discount": 50,
       "image": "Taza-frase1.jpg",
       "categoryId": 1,
       createdAt: new Date
       
    },
    {
       "name": "Taza “Pura buena vibra”",
       "description": "Taza con frase “Pura buena vibra” en fondo rosa vitrificada. Capacidad de 250ml y medidas de 9cm alto x 7cm ancho.",
       "price": 1600,
       "discount": 5,
       "image": "Taza-frase2.jpg",
       "categoryId": 1,
       createdAt: new Date
    },
    {
       "name": "Taza “hoy, sé tú”",
       "description": "Taza con frase en fondo “hoy, sé tú” vitrificada. Con etiqueta cerámica horneada y encapsulada en esmalte. Capacidad de 250ml y medidas de 9cm alto x 7cm ancho.",
       "price": 1600,
       "discount": 5,
       "image": "Taza-frase3.jpg",
       "categoryId": 1,
       createdAt: new Date
    },
    {
       "name": "Taza “Todo va a estar bien” ",
       "description": "Taza con frase en fondo “Todo va a estar bien” vitrificada. Capacidad de 250ml y medidas de 9cm alto x 7cm ancho.",
       "price": 1600,
       "discount": 5,
       "image": "Taza-frase4.jpg",
       "categoryId": 1,
       createdAt: new Date
    },
    {
       "name": "Taza Manchas",
       "description": " Taza de cerámica con interior y exterior de color hueso brillante con puntitos y manchas pintadas en tonos maple, rosa palo y flamingo. Capacidad de 250ml y medidas de 9cm alto x 7cm ancho ",
       "price": 1350,
       "discount": 0,
       "image": "Taza-manchas.jpg",
       "categoryId": 2,
       createdAt: new Date
    },
    {
       "name": "Taza Flor",
       "description": " Taza de cerámica con interior de color hueso brillante y exterior con franja de flores. Capacidad de 200ml y medidas de 7cm alto x 6cm ancho ",
       "price": 1400,
       "discount": 0,
       "image": "Taza-flor.jpg",
       "categoryId": 2,
       createdAt: new Date
    },
    {
       "name": "Taza Órbita",
       "description": " Taza de cerámica con línea grabada en color oro. Capacidad de 350ml y medidas de 9cm alto x 7cm ancho.",
       "price": 1800,
       "discount": 0,
       "image": "Taza-orbita.jpg",
       "categoryId": 2,
       createdAt: new Date
    },
    {
       "name": "Taza mar",
       "description": "Taza de cerámica con interior de color hueso brillante y exterior con franja superior en turqueza. Capacidad de 170ml y medidas de 7cm alto x 7cm ancho",
       "price": 1000,
       "discount": 0,
       "image": "Taza-mar.jpg",
       "categoryId": 2,
       createdAt: new Date
    },
    {
       "name": "Tetera Gala",
       "description": "Tetera de vidrio c/infusor de acero inoxidable con capacidad de 600ml.",
       "price": 2500,
       "discount": 5,
       "image": "Tetera-vidrio.jpg",
       "categoryId": 3,
       createdAt: new Date
    },
    {
       "name": "Tetera Terracota",
       "description": "Tetera de porcelana blanca con diseños. Capacidad de 650ml.",
       "price": 1600,
       "discount": 0,
       "image": "Tetera-terracota.jpg",
       "categoryId": 3,
       createdAt: new Date
    },
    {
       "name": "Tetera Curve",
       "description": "Tetera de porcelana celeste con infusor de acero inoxidable. Capacidad de 500ml.",
       "price": 1200,
       "discount": 0,
       "image": "Tetera-curve.jpg",
       "categoryId": 3,
       createdAt: new Date
    },
    {
       "name": "Azucarera Golden",
       "description": "Azucarera de cerámica blanca con ribete dorado “Linea Golden”, incluye cucharita. Medidas de 7 x 8 cm y capacidad de 200ml.",
       "price": 1000,
       "discount": 0,
       "image": "Azucarera-golden.jpg",
       "categoryId": 4,
       createdAt: new Date
    },
    {
       "name": "Azucarera Butterfly",
       "description": "Azucarera de cerámica blanca con detalles externos de mariposas, incluye cucharita. Medidas de 13 x 8cm y capacidad de 250ml.",
       "price": 900,
       "discount": 0,
       "image": "Azucarera-butterfly.jpg",
       "categoryId": 4,
       createdAt: new Date
    },
    {
       "name": "Azucarera Multicolor",
       "description": "Azucarera de cerámica con detalles externos multicolor, incluye cucharita. Medidas de 7 x 9cm y capacidad de 200ml.",
       "price": 850,
       "discount": 0,
       "image": "Azucarera-multicolor.jpg",
       "categoryId": 4,
       createdAt: new Date
    }
 
]

module.exports = {
  up: async (queryInterface, Sequelize) => {
   
    await queryInterface.bulkInsert('Products',products , {});
    
  },

  down: async (queryInterface, Sequelize) => {
   
    await queryInterface.bulkDelete('Products', null, {});
     
  }
};