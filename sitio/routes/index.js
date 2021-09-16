var express = require('express');
var router = express.Router();

const {index,carrito} = require("../controllers/mainController");

/* GET home page. */
router.get('/', index);
router.get("/productCart", carrito);

module.exports = router;
