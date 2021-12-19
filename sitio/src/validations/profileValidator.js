const { check, body } = require('express-validator');

module.exports = [

    check('name')
        .notEmpty().withMessage('El nombre es requerido'),

    check('telefono')
        .notEmpty().withMessage('El número de teléfono es requerido'),

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