var express = require('express');
const productsController = require('../controllers/productsController');
var router = express.Router();

const {index,detail,cart,add,edit,update, destroy} = require('../controllers/productsController')

/* products */
router.get('/',index); 
router.get('/detail/:id',detail);
router.get('/cart',cart);
router.get('/add',add);

/* edit */
router.get('/edit',edit);
router.delete('/destroy/:id',destroy) 
router.put('/edit',update);
 

/* create */
router.get('/create', productsController.create);
router.post('/create', productsController.store);
 

/* edit */
router.get('/edit/:id',edit);
router.put('/edit/:id',update);
 
 


module.exports = router;
