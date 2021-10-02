var express = require('express');
var router = express.Router();

const {index,detail,cart,add,edit,update} = require('../controllers/productsController')

/* products */
router.get('/',index); 
router.get('/detail',detail);
router.get('/cart',cart);
router.get('/add',add);

/* edit */
router.get('/edit/:id',edit);
router.put('/edit/:id',update);
 


module.exports = router;
