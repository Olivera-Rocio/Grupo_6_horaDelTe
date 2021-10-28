var express = require('express');
const productsController = require('../controllers/productsController');
var router = express.Router();
const upload = require('../middlewares/multerImageProduct');

const {index,detail,cart,add,edit,update, destroy} = require('../controllers/productsController')

const productValidator = require('../validations/productValidator');

/* products */
router.get('/',index); 
router.get('/detail/:id',detail);
router.get('/cart',cart);
router.get('/add',add);

/* edit */
router.delete('/destroy/:id',destroy);
 

/* create */
router.get('/create', productsController.create);
router.post('/create', upload.single('image'),productValidator, productsController.store);
 

/* edit */
router.get('/edit/:id',edit);
router.put('/edit/:id',upload.single('image'),update);
 
 


module.exports = router;
