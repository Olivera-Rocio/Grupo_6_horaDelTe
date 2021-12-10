const path = require('path');
const multer = require('multer');

/* configuración de multer */
const storage = multer.diskStorage({
    destination : (req,file,callaback) => {
        callaback(null,'./public/img/products')
    },
    filename : (req,file,callaback) => {
        callaback(null,'producto-' + Date.now() + path.extname(file.originalname))
    }
})

const fileFilter = function(req, file,callback){
    if(!file.originalname.match(/\.(jpg|jpeg|png|gif|webp)$/)){
        req.fileValidationError = "Sólo se permiten archivos jpg, jpeg, png, gif, webp.";
        return callback(null,false,req.fileValidationError);
    }
    callback(null,true);
}

const upload = multer({
    storage,
    fileFilter
})

module.exports = upload;