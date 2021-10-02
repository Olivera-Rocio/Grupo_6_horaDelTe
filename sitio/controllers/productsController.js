const fs = require('fs');
const path = require('path');
let products = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'data', 'products.json'),'utf-8'));


const toThousand = require('../utils/toThousand')
const toDiscount = require('../utils/toDiscount');

module.exports = {
    index: (req, res) => {
        let products = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'data', 'products.json'),'utf-8'));

		return res.render("products",{
            products,
            toThousand,
			toDiscount
        }
        )
	},
    detail : (req,res) => {
        return res.render('productDetail')
    },
    cart : (req, res) => {
        return res.render('productCart')
    },
    add : (req,res) => {
        return res.render('productAdd')
    },


    edit : (req,res) => {
        
        return res.render('productModify',{
            product : products.find(product => product.id === +req.params.id),
            toThousand,
        })
    },

    update: (req,res) => {
        let { name, price, discount, category, description} = req.body;

        let productEdited = {
            id : +req.params.id,
            name: name.trim(),
            price: +price,
            discount: +discount,
            category,
            description: description.trim(),
        };

        let productsEdited = products.map(product => product.id === +req.params.id ? productEdited : product)

        fs.writeFileSync(path.join(__dirname,'..', 'data', 'products.json'), JSON.stringify(productsEdited,null,3), 'utf-8');
        res.redirect('/products/detail' + req.params.id)
    }
   
}