const fs = require('fs');
const path = require('path');

const productFilePath = path.join(__dirname, '../data/products.json');

let products = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'data', 'products.json'),'utf-8'));


const toDiscount = require('../utils/toDiscount');
const checkId = require('../utils/checkId');

module.exports = {
    index: (req, res) => {
        let products = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'data', 'products.json'),'utf-8'));

		return res.render("products",{
            products,
            categories,
			toDiscount
        }
        )
	},
    detail : (req,res) => {
        let product = products.find(product => product.id === +req.params.id);
        //return res.send(req.params)
        return res.render("productDetail",{
			product,
            toDiscount,
			toThousand
		})
    },
    cart : (req, res) => {
        return res.render('productCart')
    },
    add : (req,res) => {
        return res.render('productAdd')
    },


create: (req,res) => {
return res.render('productAdd')

} ,

store: (req, res) => {
    
    const {
        name,price,discount,description,category
    } = req.body;
    let product = {
        id: (products[ products.lenght-1].id +1) ,
        name, 
        price : +price, 
        discount : +discount, 
        category, 
        description, 
        image : 'Taza-flor.jpg'
    }

 
products.push(product);
fs.writeFileSync(productFilePath,JSON.stringify(products, null, 2),'utf-8');

return res.redirect ('/')
}

,

    edit : (req,res) => {
        return res.render('productModify',{

        })
    },

    update: (req,res) => {
        return res.render
    }
   
}
