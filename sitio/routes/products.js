var express = require('express');
<<<<<<< HEAD
var router = express.Router();

const {index,detail,cart,add,edit} = require('../controllers/productsController')

/* products */
router.get('/',index); 
router.get('/detail/:id',detail);
router.get('/cart',cart);
router.get('/add',add);
router.get('/edit',edit);
=======
const productsController = require('../controllers/productsController');
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
 

/* create */
router.get('/create', productsController.create);
router.post('/create', productsController.store);
>>>>>>> origin/jsonadmin
 


module.exports = router;
