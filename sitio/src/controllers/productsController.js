const fs = require('fs');
const path = require('path');

//const productFilePath = path.join(__dirname, '../data/products.json');

//let products = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'data', 'products.json'),'utf-8'));

const toDiscount = require('../utils/toDiscount');
const checkId = require('../utils/checkId');
const toThousand = require('../utils/toThousand');
const { validationResult } = require('express-validator');

/* base de datos */
const db = require('../database/models');
const { Op } = require('sequelize');

module.exports = {
    index: (req, res) => {

        let products = db.Product.findAll()

        Promise.all([products])

            .then(([products]) => {
                //return res.send(products)
                return res.render("products", {
                    products,
                    toThousand,
                    toDiscount
                }
                )
            })
            .catch(error => console.log(error))

    },
    detail: (req, res) => {

        db.Product.findByPk(req.params.id, {
            include: [
                {
                    association: 'Category'
                }
            ]
        })
            .then(product => {
                // return res.send(product)
                return res.render('productDetail', {
                    product
                })

            })
            .catch(error => console.log(error))

    },
    category: (req, res) => {

        let products = db.Product.findByPk(req.params.id, {
            include: [
                {
                    association: 'Category'
                }
            ]
        })
        
        let categories = db.Category.findAll()

        Promise.all([products,categories])

            .then(([products,categories]) => {
                // return res.send(product)
                return res.render('categories', {
                    products,
                    categories
                })

            })
            .catch(error => console.log(error))

    },
    cart: (req, res) => {
        return res.render('productCart')
    },
    add: (req, res) => {
        //return res.render('productAdd')
        db.Category.findAll()
            .then(categories => {
                //return res.send(categories)
                return res.render('productAdd', {
                    categories
                })
            })
            .catch(error => console.log(error))
    },
    create: (req, res) => {
        //return res.render('productAdd')
        db.Category.findAll()
            .then(categories => {
                //return res.send(categories)
                return res.render('productAdd', {
                    categories
                })
            })
            .catch(error => console.log(error))
    },
    store: (req, res) => {
        let errors = validationResult(req);

        if (errors.isEmpty()) {

            const { name, price, discount, description, category } = req.body;

            db.Product.create({
                name: name.trim(),
                description: description.trim(),
                price,
                discount,
                image: req.file ? req.file.filename : 'default-image.png',
                CategoryId: category

            })

                .then(product => {
                    //return (res.send(product))
                    return res.redirect('/admin')
                })
                .catch(error => console.log(error))
        } else {

            db.Category.findAll()
                .then(categories => {
                    return res.render('productAdd', {
                        categories,
                        errors: errors.mapped(),
                        old: req.body
                    })
                })
                .catch(error => console.log(error))
        }
    },
    edit: (req, res) => {

        let product = db.Product.findByPk(req.params.id)
        let categories = db.Category.findAll()

        Promise.all([product, categories])

            .then(([product, categories]) => {
                //return (res.send(product))
                return res.render('productModify', {
                    product,
                    categories,
                    toThousand
                })
            })
            .catch(error => console.log(error))
    },
    update: (req, res) => {
        let errors = validationResult(req);

        if (errors.isEmpty()) {

            const { name, price, discount, category, description } = req.body;

            db.Product.findByPk(req.params.id)
                .then(product => {

                    db.Product.update(
                        {
                            name: name.trim(),
                            description: description.trim(),
                            price,
                            discount,
                            image: req.file ? req.file.filename : product.image,
                            CategoryId: category
                        },
                        {
                            where: {
                                id: req.params.id
                            }
                        }
                    )
                        .then(() => {
                            //return (res.send(product))
                            let exist = fs.existsSync(path.join(__dirname, "../../public/img/products/" + product.image))


                            if (req.file && exist && product.image != "default-image.png") {

                                fs.unlinkSync(path.join(__dirname, "../../public/img/products/" + product.image))

                            }
                            return res.redirect('/admin')
                        })
                        .catch(error => console.log(error))
                })
                .catch(error => console.log(error))

        } else {

            let product = db.Product.findByPk(req.params.id)
            let categories = db.Category.findAll()

            Promise.all([product, categories])

                .then(([product, categories]) => {
                    return res.render('productModify', {
                        categories,
                        product,
                        errors: errors.mapped(),
                        old: req.body
                    })
                })
                .catch(error => console.log(error))
        }
    },
    destroy: (req, res) => {

        let product = db.Product.findByPk(req.params.id)// trae el producto 


        let resultDestroy = db.Product.destroy({// elimina la imagen 
            where: {
                id: req.params.id,
            }
        })
        Promise.all([product, resultDestroy])
            .then(([product, resultDestroy]) => {

                let exist = fs.existsSync(path.join(__dirname, "../../public/img/products/" + product.image))


                if (exist && product.image != "default-image.png") {

                    fs.unlinkSync(path.join(__dirname, "../../public/img/products/" + product.image))

                }

                return res.redirect('/admin')
            })
            .catch(error => console.log(error))
    },
    searchAdmin: (req, res) => {

        db.Product.findAll({
            where: {
                name: {
                    [Op.substring]: req.query.keywords
                }
            },
            include: [
                {
                    association: 'Category'
                }
            ]
        })

            .then((products) => {
                //return (res.send(products))
                return res.render('searchAdmin', {
                    products,
                    keywords: req.query.keywords
                })
            })
            .catch(error => console.log(error))
    }
} 
