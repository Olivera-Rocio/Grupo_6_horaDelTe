var express = require('express');
var router = express.Router();

const {index, admin,search,destroy} = require('../controllers/mainController');
const adminUserCheck = require('../middlewares/adminUserCheck');

/* GET home page. */
router.get('/',index);
router.get('/admin',adminUserCheck,admin);
router.get('/search',search);
router.delete('/destroy/:id',destroy); 




module.exports = router;
