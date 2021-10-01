var express = require('express');
var router = express.Router();

const {index,detail,cart,add,edit,update} = require('../controllers/productsController')

/* products */
router.get('/',index); 
router.get('/detail',detail);
router.get('/cart',cart);
router.get('/add',add);

/* edit */
router.get('/edit',edit);
router.put('/edit',update);
 


module.exports = router;
