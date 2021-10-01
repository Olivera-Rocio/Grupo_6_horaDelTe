const fs = require('fs');
const path = require('path');
let products = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'data', 'products.json'), 'utf-8'))
module.exports = {
    detail: (req, res) => {
        return res.render('productDetail')
    },
    cart: (req, res) => {
        return res.render('productCart')
    },
    add: (req, res) => {
        return res.render('productAdd')
    },
    edit: (req, res) => {
        return res.render('productModify')
    },
    destroy: (req, res) => {
        let producto = products.fine(product => product.id === +req.params.id)
        producto.image.forEach(img => {
            fs.existsSync(path.join(__dirname, '../public/images/products', img)) ? fs.unlinkSync(path.join(__dirname, '../public/images/products', img)) : null

        });
        let productsModified = products.filter(product => product.id !== +req.params.id);

        fs.writeFileSync(path.join(__dirname, '..', 'data', 'products.json'), JSON.stringify(productsModified, null, 3), 'utf-8');

        return res.redirect('/admin')
    }
}