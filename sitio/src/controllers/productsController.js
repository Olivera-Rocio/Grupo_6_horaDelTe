const fs = require('fs');
const path = require('path');

const productFilePath = path.join(__dirname, '../data/products.json');

let products = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'data', 'products.json'),'utf-8'));

const toDiscount = require('../utils/toDiscount');
const checkId = require('../utils/checkId');
const toThousand = require('../utils/toThousand') ; 
const {validationResult} = require('express-validator');

/* base de datos */
const db = require('../database/models');
const { Op } = require('sequelize');

module.exports = {
    index: (req, res) => {
        /*const products = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'data', 'products.json'),'utf-8'));
		return res.render("products",{
            products,
            toThousand,
			toDiscount
        }
        )*/

        let products = db.Product.findAll()

        Promise.all([products])

        .then(([products]) => {
            //return (res.send(products))
            return res.render("products",{
                products,
                toThousand,
                toDiscount
            }
            )
        })
        .catch(error => console.log(error))

	},
    detail : (req,res) => {
        /*let product = products.find(product => product.id === +req.params.id);
        //return res.send(req.params)
        return res.render("productDetail",{
			product,
            toDiscount,
			toThousand
		})*/
        
        db.Product.findByPk(req.params.id, {
            include: [
                {
                    association: 'Category'
                }
            ]
        }) 
            .then(product => { 
               // return (res.send(product))
                        return res.render('productDetail', {
                            product
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
                //return (res.send(categories))
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
                //return (res.send(categories))
                return res.render('productAdd', {
                    categories
                })
            })
            .catch(error => console.log(error))
    },
    store: (req, res) => {
        let errors = validationResult(req);

        if(errors.isEmpty()){
            const { name,price,discount,description,category} = req.body;
            /*let product = {
                id: (products[products.length-1].id + 1),
                name, 
                price : +price, 
                discount : +discount, 
                category, 
                description, 
                image : req.file ? req.file.filename :'default-image.png'
            }
            products.push(product);
            fs.writeFileSync(productFilePath,JSON.stringify(products, null, 2),'utf-8');
            return res.redirect ('/admin')*/

           
            db.Product.create({
                name : name.trim(),
                description : description.trim(),
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
        }else{
            /*return res.render('productAdd',{
                errors : errors.mapped(),
                old : req.body
            })*/

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
    edit : (req,res) => {
        /*return res.render('productModify',{
            product : products.find(product => product.id === +req.params.id),
            toThousand,
        })*/
        let product = db.Product.findByPk(req.params.id) 
        let categories = db.Category.findAll()

        Promise.all([product,categories])

        .then(([product,categories]) => {
           //return (res.send(product))
            return res.render('productModify', {
                product,
                categories,
                toThousand
            })
        })
        .catch(error => console.log(error))
    },
    update: (req,res) => {
        let errors = validationResult(req);

        if (errors.isEmpty()) {
            const { name, price, discount, category, description } = req.body;
            /*let product = products.find(product => product.id === +req.params.id);
            let productEdited = {
                id: +req.params.id,
                name: name.trim(),
                price: +price,
                discount: +discount,
                category,
                image: req.file ? req.file.filename : product.image,
                description: description.trim()
            };*/

            db.Product.findByPk(req.params.id)
            .then( product => {

                db.Product.update(
                    {
                        name : name.trim(),
                        description : description.trim(),
                        price,
                        discount,
                        image: req.file ? req.file.filename : product.image,
                        CategoryId: category
                    },
                    {
                        where : {
                            id : req.params.id
                        }
                    }
                )
                .then( () => {
                    //return (res.send(product))
                    let exist = fs.existsSync(path.join(__dirname, "../../public/img/products/" + product.image))


                    if ( req.file && exist && product.image != "default-image.png") {    
                       
                        fs.unlinkSync(path.join(__dirname, "../../public/img/products/" + product.image))
                      
                    }
                    return res.redirect('/admin')
                })
                .catch(error => console.log(error))
            })
            .catch(error => console.log(error))

           /* if (req.file) {
                if (fs.existsSync(path.join(__dirname, '../public/img/product/' + product.image)) && product.image != "default-image.png") {
                    fs.unlinkSync(path.join(__dirname, '../public/img/product/' + product.image))
                }
            }
            let productsEdited = products.map(product => product.id === +req.params.id ? productEdited : product)
            fs.writeFileSync(path.join(__dirname, '..', 'data', 'products.json'), JSON.stringify(productsEdited, null, 3), 'utf-8');
            res.redirect('/admin')*/
        } else {
            /*return res.render('productAdd', {
                errors: errors.mapped(),
                old: req.body
            })*/

            let product = db.Product.findByPk(req.params.id)
            let categories = db.Category.findAll()
    
            Promise.all([product,categories])
    
            .then(([product,categories]) => {
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
    destroy : (req, res) => {
        /*let product = products.find((producto) => producto.id === +req.params.id)
        let productsModified = products.filter(product => product.id !== +req.params.id );
        if (fs.existsSync(path.join(__dirname, "../public/img/products" + product.image) && product.image != "default-image.png")) {        
            fs.unlinkSync(path.join(__dirname, "../public/img/products" + product.image))
        }
        fs.writeFileSync(path.join(__dirname,'..', 'data', 'products.json'),JSON.stringify(productsModified,null,3), 'utf-8');
        res.redirect('/admin')*/

        /*db.Product.findByPk(req.params.id)
        .then(product => {
            if(fs.existsSync('../public/img/products' + product.image)){
                fs.unlinkSync('../public/img/products' + product.image)}*/

            let product = db.Product.findByPk(req.params.id)// trae el producto 


              let resultDestroy = db.Product.destroy({// elimina la imagen 
                   where : {
                       id : req.params.id,
                    }
                }) 
                Promise.all([product, resultDestroy])
                .then( ([product, resultDestroy]) => {

                    let exist = fs.existsSync(path.join(__dirname, "../../public/img/products/" + product.image))


                    if ( exist && product.image != "default-image.png") {    
                        
                        fs.unlinkSync(path.join(__dirname, "../../public/img/products/" + product.image))
                        
                    }

                    return res.redirect('/admin')
                })
                .catch(error => console.log(error))
            //})
        //.catch(error => console.log(error))
    }
 } 
