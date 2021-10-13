const bcrypt = require('bcryptjs');
const fs = require('fs');
const path = require('path');
let users = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'data', 'users.json'), 'utf-8'));

module.exports = {
    register : (req,res) => {
        return res.render("register")
    },
    processRegister: (req, res) => {
        //return res.send(req.body)
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
            return res.redirect('/')
    },
    login : (req,res) => {
        return res.render("login")
    }
}