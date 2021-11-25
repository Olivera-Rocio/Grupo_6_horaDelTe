const {body,check} = require('express-validator');
//const users = require('../data/users.json');

/* base de datos */
const db = require('../database/models');

module.exports = [
    check("name")
    .notEmpty().withMessage("Ingresar nombre y apellido"),

    check("email")
        .notEmpty().withMessage("Ingresar email").bail()
        .isEmail().withMessage("Email inválido"),

    body("email")
    .custom(value  => {
        return db.User.findOne({
            where : { 
                email : value
              }
        }).then( user => {
            if(user){
                return Promise.reject('El email ya se encuentra registrado')
            }
        })
      }),
        /*.custom(value  => {
            let user = users.find(user => user.email === value);
            if(user){
                return false
            }else{
                return true
            }
        }).withMessage("El email ya se encuentra registrado"),*/

    check("telefono")
     .notEmpty().withMessage("Ingresar número de teléfono"),

     check("password")
        .isLength({
            min : 6,
            max : 12
        }).withMessage("La contraseña debe tener un mínimo de 6 y un máximo de 12 caracteres"),
    
    body("password2")
        .custom((value,{req}) => {
            if(value !== req.body.password){
                return false
            }else{
                return true
            }
        }).withMessage("Las contraseñas no coinciden"),
]