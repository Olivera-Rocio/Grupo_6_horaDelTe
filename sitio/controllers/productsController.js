const fs = require('fs');
const path = require('path');
let products = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'data', 'products.json'),'utf-8'));


const toDiscount = require('../utils/toDiscount');

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

        })
    },

    update: (req,res) => {
        return res.render
    }
   
}