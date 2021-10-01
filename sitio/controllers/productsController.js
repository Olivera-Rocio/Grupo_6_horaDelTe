const fs = require('fs');
const path = require('path');

//const products= require("../data/products.json");
let  products = JSON.parse(fs.readFileSync(path.join(__dirname,'..','data','products.json'),'utf-8'));

const toThousand = require("../utils/toThousand");
const toDiscount = require("../utils/toDiscount");



const controller = {
    index: (req, res) => {
		return res.render("products")
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
    edit : (req,res) => {
        return res.render('productModify')
    },
   
}
module.exports = controller;