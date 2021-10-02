const fs = require('fs');
const path = require('path');

const products= require("../data/products.json");
//let  products = JSON.parse(fs.readFileSync(path.join(__dirname,'..','data','products.json'),'utf-8'));

const toThousand = require("../utils/toThousand");
const toDiscount = require("../utils/toDiscount");

module.exports = {
    index : (req, res) => {
return res.render('index',{
    products,
    toThousand,
    toDiscount
})
    },
     admin : (req,res) => {
        return res.render('admin',{
            products
        })
    }
   
}