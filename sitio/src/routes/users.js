var express = require('express');
var router = express.Router();
const userLoginCheck = require('../middlewares/userLoginCheck');
const registerValidator = require("../validations/registerValidation");
const loginValidator = require('../validations/loginValidator');
const upload = require('../middlewares/multerImageUser');
const profileValidator = require('../validations/profileValidator');
const notEntry = require('../middlewares/notEntry');

 
const {register,processRegister,login,processLogin, logout, profile, update} = require('../controllers/usersController')

 /* users */
router.get('/register',notEntry,register);
router.post('/register',registerValidator,processRegister);
router.get('/login',login);
router.post('/login',loginValidator, processLogin);
router.get('/logout', logout);
router.get('/profile',userLoginCheck, profile);
router.post('/profile',upload.single('avatar'),profileValidator, update);



module.exports = router;
