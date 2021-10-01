var express = require('express');
var router = express.Router();

const {detail,cart,add,edit, destroy} = require('../controllers/productsController')

 /* products */
router.get('/detail',detail)
router.get('/cart',cart);
router.get('/add',add);
router.get('/edit',edit);
router.destroy('/destroy/:id',destroy) 


module.exports = router;
