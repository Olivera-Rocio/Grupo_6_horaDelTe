const bcrypt = require('bcryptjs');
const fs = require('fs');
const path = require('path');
const users = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'data', 'users.json'), 'utf-8'));
const { validationResult } = require("express-validator");

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
            ).then(() => {
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
            }).then(user => {
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
    logout : (req,res) =>{
        req.session.destroy();
        res.cookie('horaDelTe',"", { maxAge: -1 });
        res.redirect('/')

    },
    profile:  (req, res) => {
        let users = JSON.parse(fs.readFileSync(path.join(__dirname,'../data/users.json'),'utf-8'));
        return res.render('profile',{
            user : users.find(user => user.id === req.session.userLogin.id)
        })
    },
    update : (req,res) => {
        //return res.send(req.file)
        let errors = validationResult(req);

        if(errors.isEmpty()){

            let user = users.find(user => user.id === req.session.userLogin.id);
            let hashPass = req.body.password ? bcrypt.hashSync(req.body.password,10) : user.password;

            console.log(req.body.password)

            let userModified = {
                id : user.id,
                name : req.body.name,
                email : user.email,
                telefono: req.body.telefono,
                password : hashPass,
                avatar : req.file ? req.file.filename : user.avatar,
                rol : user.rol
            }

            if(req.file){
                if(fs.existsSync(path.join(__dirname,'../public/img/users/' + user.avatar)) && user.avatar != "default.png"){
                    fs.unlinkSync(path.join(__dirname,'../public/img/users/' + user.avatar))

                }
            }
    
            let usersModified = users.map(user => user.id === req.session.userLogin.id ? userModified : user);
    
            fs.writeFileSync(path.join(__dirname,'../data/users.json'),JSON.stringify(usersModified,null,3),'utf-8');
    
            req.session.userLogin = {
                id : user.id,
                name : userModified.name,
                avatar : userModified.avatar,
                rol : user.rol
            }
    
            return res.redirect('/users/profile')
        }else{
            res.render('profile',{
                user : users.find(user => user.id === req.session.userLogin.id),
                errors : errors.mapped()
            })
        }

       
    }
}