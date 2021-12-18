const bcrypt = require('bcryptjs');
const fs = require('fs');
const path = require('path');
//const users = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'data', 'users.json'), 'utf-8'));
const { validationResult } = require('express-validator');

/* base de datos */
const db = require('../database/models');

module.exports = {
    register: (req, res) => {
        return res.render("register")
    },
    processRegister: (req, res) => {
        //return res.send(req.body)
        let errors = validationResult(req);

        if (errors.isEmpty()) {
            const { name, email, telefono, password } = req.body;
            db.User.create(
                {
                    name: name.trim(),
                    email: email.trim(),
                    telefono: telefono.trim(),
                    password: bcrypt.hashSync(password, 10),
                    avatar: "default.png",
                    rolId: 1
                }
            ).then( user => {
                //return res.send(user)
                req.session.userLogin = {
                    id: user.id,
                    name: user.name,
                    avatar: user.avatar,
                    rol: user.rolId
                }
                return res.redirect('/')

            })
                .catch(error => console.log(error))

        } else {
            return res.render('register', {
                errores: errors.mapped()
            })
        }
    },
    login: (req, res) => {
        return res.render("login")
    },
    processLogin: (req, res) => {
        let errors = validationResult(req);

        if (errors.isEmpty()) {
            db.User.findOne({
                where: {
                    email: req.body.email
                }
            }).then( user => {
                req.session.userLogin = {
                    id: user.id,
                    name: user.name,
                    avatar: user.avatar,
                    rol: user.rolId
                }
                if (req.body.remember) {
                    res.cookie('horaDelTe', req.session.userLogin, { maxAge: 1000 * 60 })
                }
                return res.redirect('/')
            })
                .catch(error => console.log(error))
        } else {
            return res.render('login', {
                errores: errors.mapped()
            })
        }
    },
    logout: (req, res) => {
        req.session.destroy();
        res.cookie('horaDelTe', "", { maxAge: -1 });
        res.redirect('/')

    },
    profile: (req, res) => {
        db.User.findByPk(req.session.userLogin.id, {
            include: [{ all: true }]
        })
            .then(user => {
                return res.render('profile', {
                    user
                })
            })
            .catch(error => console.log(error))
        /*let users = JSON.parse(fs.readFileSync(path.join(__dirname,'../data/users.json'),'utf-8'));
        return res.render('profile',{
            user : users.find(user => user.id === req.session.userLogin.id)
        })*/
    },
    update: async (req, res) => {
      
        let errors = validationResult(req);

        errors = errors.mapped()

        if (req.fileValidationError) {
            errors = {
                ...errors,
                avatar: {
                    msg: req.fileValidationError,
                },
            };
        }

        function isObjEmpty(obj) {
            for (var prop in obj) {
              if (obj.hasOwnProperty(prop)) return false;
            }
          
            return true;
          }
        
       
        if (isObjEmpty(errors)) {

            const { name, email, telefono, password } = req.body;

            let avatarProfile = req.file && req.file.filename;

            try {
                let user = await db.User.findByPk(req.session.userLogin.id)
                db.User.update(
                    {
                        name: name,
                        email: email,
                        telefono: telefono,
                        password: req.body.password ? bcrypt.hashSync(password, 10) : user.password,
                        avatar: avatarProfile ? avatarProfile : user.avatar
                    }, {
                    where: {
                        id: req.session.userLogin.id
                    }
                })
                .then( () => {
                    let exist = fs.existsSync(path.join(__dirname, "../../public/img/users/" + user.avatar))

                    if ( req.file && exist && user.avatar != "default.png") {    
                       
                        fs.unlinkSync(path.join(__dirname, "../../public/img/users/" + user.avatar))
                      
                    }
                    let passChange = false;

                    if(password  !== req.session.userLogin.password){
                        passChange = true
                        }

                    req.session.userLogin = {
                        id: req.session.userLogin.id,
                        name,
                        passChange,
                        avatar: avatarProfile ? avatarProfile : user.avatar ,
                        rol: user.rolId
                    }
    
                    res.locals.userLogin = req.session.userLogin

                    return res.redirect('/users/profile')

                })
                .catch(error => console.log(error))
                
              
            } catch (error) {
                console.log(error)
            }


        } else {
         
            db.User.findByPk(req.session.userLogin.id, {
                include: [{ all: true }]
            })
                .then(user => {
                    return res.render('profile', {
                        user,
                        errors,
                        old: req.body,
                        session: req.session
                    })
                })
                
        }
    },
    destroy : (req, res) => {

        let user = db.User.findByPk(req.params.id)
        let resultDestroy = db.User.destroy({
                   where : {
                       id : req.params.id,
                    }
                })

                Promise.all([user, resultDestroy]) 
                .then( ([user, resultDestroy]) => {

                    let exist = fs.existsSync(path.join(__dirname, "../../public/img/users/" + user.avatar))

                    if ( exist && user.avatar != "default.png") {    
                        
                        fs.unlinkSync(path.join(__dirname, "../../public/img/users/" + user.avatar))
                        
                    }
                    return res.redirect('/admin')
                })
                .catch(error => console.log(error))
        
    }
}