const { check, body } = require('express-validator');

const regExPhone = /^[0-9]/

module.exports = [

    check('name')
        .notEmpty().withMessage('El nombre es requerido'),
    body('name')
        .custom(value => {
            let nombreSeparado = value.split(" ");

            let nombre = nombreSeparado[0];

            let apellido = nombreSeparado[1];
            
            
                if (nombre.trim().length < 2 || apellido.trim().length < 2) {
                    return false
                } else {
                    return true
                }

        }).withMessage('El nombre y el apellido debe tener 2 o más caracteres'),

    check('telefono')
        .notEmpty().withMessage('El número de teléfono es requerido'),

        body('telefono')
        .custom(value => {
            
            
                if (!regExPhone.test(value)) {
                    return false
                } else {
                    return true
                }

        }).withMessage('Ingresa un numero valido'),

    body('password')
        .custom(value => {
            if (value.length != 0) {
                if (value.length < 8 || value.length > 16) {
                    return false
                } else {
                    return true
                }
            } else {
                return true
            }
        }).withMessage('La contraseña debe tener un mínimo de 8 y un máximo de 16 caracteres'),

]