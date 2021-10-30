var express = require('express');
var router = express.Router();

 
const {register, login} = require('../controllers/usersController')

 /* users */
router.get('/register',register);
router.get('/login',login);

module.exports = router;

const sessionCheck = require('../middlewares/sessioncheck')

router.get('/login', sessionCheck, login);
router.get('/register', sessionCheck, register);