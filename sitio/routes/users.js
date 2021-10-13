var express = require('express');
var router = express.Router();

 
const {register,processRegister,login} = require('../controllers/usersController')

 /* users */
router.get('/register',register);
router.post('/register',processRegister);
router.get('/login',login);

module.exports = router;
