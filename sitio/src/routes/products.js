var express = require('express');
var router = express.Router();
const upload = require('../middlewares/multerImageProduct');

const {index,detail,cart,add,create,store,edit,update, destroy,searchAdmin,category} = require('../controllers/productsController')

const productValidator = require('../validations/productValidator');
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
router.post('/create', upload.single('image'),productValidator, store);
 

/* edit */
router.get('/edit/:id',adminUserCheck,edit);
router.put('/edit/:id',upload.single('image'),productValidator,update);
 
 


module.exports = router;
