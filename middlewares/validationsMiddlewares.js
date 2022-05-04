const { body, validationResult } = require('express-validator');

const creatUserValidations = [

    body('name').notEmpty().withMessage('Name cannot be empty'),
    body('email').notEmpty().withMessage('Email cannot be empty').isEmail().withMessage('Must be a valid email'),
    body('password').notEmpty().withMessage('Passsword cannot be empty').isLength({ min: 7 }).withMessage('Password must be at least 7 characters long'),
];

const creatRepairValitions = [

    body('date').notEmpty().withMessage('Name cannot be empty'),
    body('computerNumber').notEmpty().withMessage('Number computer cannot be empty'),
    body('comments').notEmpty().withMessage('Comments cannot be empty'),
];
const checkVlidations = (req, res, next) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        errors.map(({ msg }) => msg);
        const errorMsg = message.join('. ')
        return res.status(400).json({
            status: 'error',
            message: errorMsg,
        });
    }

    next();
}
module.exports = {
    creatUserValidations,
    creatRepairValitions,
    checkVlidations,
};