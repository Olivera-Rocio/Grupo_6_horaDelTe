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
            let user = {
                id: users[users.length - 1].id + 1,
                name: name.trim(),
                email: email.trim(),
                telefono: telefono.trim(),
                password: bcrypt.hashSync(password, 10),
                avatar: "default.png",
                rol: "user"
            }
            users.push(user);
            fs.writeFileSync(path.join(__dirname, '../data/users.json'), JSON.stringify(users, null, 3), 'utf-8');
            req.session.userLogin = {
                id : user.id,
                name : user.name,
                avatar : user.avatar,
                rol : user.rol
            }
            return res.redirect('/')
            
        } else {
            return res.render("register", {
                errores: errors.mapped()
            })
        }

    },
    login: (req, res) => {
        return res.render("login")
    },
    processLogin: (req, res) => {
        let errors = validationResult(req);

        if(errors.isEmpty()){
            let user = users.find(user => user.email === req.body.email);
            req.session.userLogin = {
                id: user.id,
                name: user.name,
                avatar: user.avatar,
                rol: user.rol
            }
            return res.redirect('/')
        }else{
            return res.render('login', {
                errores : errors.mapped()
            })
        }
    },
    logout : (req,res) =>{
        req.session.destroy()
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