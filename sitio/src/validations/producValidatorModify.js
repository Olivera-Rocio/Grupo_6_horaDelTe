const {check} = require('express-validator');

module.exports = [
    check('name')
    .notEmpty().withMessage('*Nombre de producto obligatorio.'),

    check('description')
    .notEmpty().withMessage('*Descripción obligatoria.').bail()
    .isLength({
        min : 20
    }).withMessage('*Debe tener un mímino de 20 carácteres.'),

    check('category')
    .notEmpty().withMessage('*Indicar categoría.'),
    
    check('price')
    .notEmpty().withMessage('*Debe indicar precio.'),

    check('price')
    .isDecimal({
        min: 1
    }).withMessage('*Ingresar un número válido.'),

    check('discount')
    .notEmpty().withMessage('*Debe indicar descuento (si no lo tiene, indicar 0).'),

    check('discount')
    .isInt({
        min: 0
    }).withMessage('*Ingresar un número válido.')
    
]