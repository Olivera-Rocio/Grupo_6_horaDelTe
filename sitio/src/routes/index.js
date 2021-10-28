var express = require('express');
var router = express.Router();

const {index, admin} = require('../controllers/maincontroller')

const notEntry = require('../middlewares/notEntry');

/* GET home page. */
router.get('/',index);
router.get('/admin',notEntry, admin);



module.exports = router;
