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

        let ofertas = db.Product.findAll({
            where : {
                discount : {
                    [Op.gte] : 5
                }
            }
        })
      
        let products = db.Product.findAll(req.params.id, {
            include: [
                {
                    association: 'Category'
                }
            ]
        })  

        let categories = db.Category.findAll()

        Promise.all([ofertas,products,categories])
        .then(([ofertas,products,categories]) => {
            //return (res.send(products))
            return res.render('index', { 
                ofertas,
                products,
                categories,
                toThousand,
                toDiscount
            });
        })
        .catch(error => console.log(error))
    },
    admin: (req, res) => {

        let products = db.Product.findAll({
            include: [
                {
                    association: 'Category'
                }
            ]
        }) 
        let users = db.User.findAll({
            include: [
                {
                    association: 'rol'
                }
            ]
        })

        Promise.all([products,users])
            .then(([products,users]) => {
                //return res.send(users)
                return res.render('admin',{
                    products,
                    users,
                    toThousand,
                    toDiscount
                })
            })
            .catch(error => console.log(error))
    }, search: (req, res) => {

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