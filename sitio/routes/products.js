var express = require('express');
var router = express.Router();

const {index,detail,cart,add,edit} = require('../controllers/productsController')

/* products */
router.get('/',index); 
router.get('/detail',detail);
router.get('/cart',cart);
router.get('/add',add);
router.get('/edit',edit);
 


module.exports = router;
