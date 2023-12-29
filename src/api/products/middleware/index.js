const { body, validationResult } = require('express-validator');

const registerValidation = [
  body('fullName').trim().isLength({ min: 1 }).withMessage('Full name is required'),
  body('email')
    .trim()
    .isLength({ min: 1 })
    .withMessage('Email is required')
    .isEmail()
    .withMessage('Invalid email address'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
  body('phoneNumber')
    .optional()
    .matches(/^\+\d{1,3}\d{8}$/)
    .withMessage('Invalid phone number format'),
];

const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const errorMessages = errors.array().map((error) => ({ field: error.param, message: error.msg ,success:false}));
    return res.status(400).json({ errors: errorMessages });
  }
  next();
};

module.exports = { registerValidation, handleValidationErrors };
