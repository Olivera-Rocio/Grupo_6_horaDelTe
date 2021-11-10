/*const fs = require('fs');
const path = require('path');
let products = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'data', 'products.json'), 'utf-8'));*/

const toThousand = require('../utils/toThousand')
const toDiscount = require('../utils/toDiscount');

/* base de datos */
const db = require('../database/models');
const { Op } = require('sequelize');

module.exports = {
    index: (req, res) => {
        /*return res.render('index', {
            products,
            toThousand,
            toDiscount
        })*/

        let ofertas = db.Product.findAll({
            where : {
                discount : {
                    [Op.gte] : 5
                }
            }
        })
      
        Promise.all([ofertas])
        .then(([ofertas]) => {
            return res.render('index', { 
                ofertas,
                toThousand,
                toDiscount
            });
        })
        .catch(error => console.log(error))
    },
    admin: (req, res) => {
        /*let products = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'data', 'products.json'), 'utf-8'));
        return res.render('admin', {
            products,
            toThousand,
            toDiscount
        }
        )*/
        let products = db.Product.findAll()

        Promise.all([products])
            .then(([products]) => {
                return res.render('admin',{
                    products,
                    toThousand,
                    toDiscount
                })
            })
            .catch(error => console.log(error))
    }, search: (req, res) => {
        /*return res.render("search",{
            products : products.filter(product => product.name.toLowerCase().includes(req.query.keywords.toLowerCase())),
            toThousand,
            toDiscount,
            keywords : req.query.keywords
        })*/
        let products = db.Product.findAll({
            where: {
                name: {
                    [Op.substring]: req.query.keywords
                }
            }
        })

        Promise.all([products])

            .then(([products]) => {
                return res.render('search', {
                    products,
                    toThousand,
                    toDiscount,
                    keywords: req.query.keywords
                })
            })
            .catch(error => console.log(error))
    }

}