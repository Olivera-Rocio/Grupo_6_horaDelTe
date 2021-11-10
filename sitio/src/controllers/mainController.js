const fs = require('fs');
const path = require('path');
let products = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'data', 'products.json'),'utf-8'));

const toThousand = require('../utils/toThousand')
const toDiscount = require('../utils/toDiscount');

const db = require('../database/models');

module.exports = {
    index : (req, res) => {
return res.render('index',{
    products,
    toThousand,
    toDiscount
})
    },
    admin : (req,res) => {
        let products = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'data', 'products.json'),'utf-8'));
        return res.render('admin',{
            products,
            toThousand,
            toDiscount 
        }
        )
    },search: (req, res) => {
        return res.render("search",{
            products : products.filter(product => product.name.toLowerCase().includes(req.query.keywords.toLowerCase())),
            toThousand,
            toDiscount,
            keywords : req.query.keywords
        })
    }
   
}