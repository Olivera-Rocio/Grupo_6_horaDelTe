var express = require('express');
var router = express.Router();
const upload = require('../middlewares/multerImageProduct');

const {index,detail,cart,add,create,store,edit,update, destroy,searchAdmin,category} = require('../controllers/productsController')

const productValidatorAdd = require('../validations/productValidatorAdd');
const productValidatorModify = require('../validations/producValidatorModify')
const adminUserCheck = require('../middlewares/adminUserCheck');

/* products */
router.get('/',index); 
router.get('/detail/:id',detail);
router.get('/cart',cart);
router.get('/add',adminUserCheck,add);
router.get('/category/:id',category);

/* eliminar */
router.delete('/destroy/:id',destroy);
 
/*busqueda*/
router.get('/search',searchAdmin);

/* create */
router.get('/create', adminUserCheck, create);
router.post('/create', upload.single('image'),productValidatorAdd, store);
 

/* edit */
router.get('/edit/:id',adminUserCheck,edit);
router.put('/edit/:id',upload.single('image'),productValidatorModify,update);
 
 


module.exports = router;
