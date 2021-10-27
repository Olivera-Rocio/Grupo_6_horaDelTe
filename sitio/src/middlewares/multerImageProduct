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

const upload = multer({
    storage
})

module.exports = upload;