var express = require('express');
var router = express.Router();
const registerValidator = require("../validations/registerValidation");
const loginValidator = require('../validations/loginValidator')
 
const {register,processRegister,login,processLogin} = require('../controllers/usersController')

 /* users */
router.get('/register',register);
router.post('/register',registerValidator,processRegister);
router.get('/login',login);
router.post('/login',loginValidator, processLogin )

module.exports = router;
