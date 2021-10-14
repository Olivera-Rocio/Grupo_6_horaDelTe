var express = require('express');
var router = express.Router();
const registerValidator = require("../validations/registerValidation");
 
const {register,processRegister,login} = require('../controllers/usersController')

 /* users */
router.get('/register',register);
router.post('/register',registerValidator,processRegister);
router.get('/login',login);

module.exports = router;
