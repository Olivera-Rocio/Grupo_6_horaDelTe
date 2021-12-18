var express = require('express');
var router = express.Router();

const {index, admin,search,nosotras} = require('../controllers/mainController');
const adminUserCheck = require('../middlewares/adminUserCheck');

/* GET home page. */
router.get('/',index);
router.get('/admin',adminUserCheck,admin);
router.get('/search',search);
router.get('/quienes-somos',nosotras);





module.exports = router;
