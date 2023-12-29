const { body, validationResult } = require('express-validator');

const validation = [
  body('fullName').trim().isLength({ min: 1 }).withMessage('Full name is required'),
  body('email')
    .trim()
    .isLength({ min: 1 })
    .withMessage('Email is required')
    .isEmail()
    .withMessage('Invalid email address'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
  body('confirmPassword')
    .optional()
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error('Passwords do not match');
      }
      return true;
    }),
  body('phoneNumber').optional().isMobilePhone().withMessage('Invalid phone number'),
];

const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  
  if (!errors.isEmpty()) {
    const errorMessages = errors.array().map((error) => ({
      field: error.path,
      message: error.msg,
    }));

    return res.status(400).json({ success: false, errors: errorMessages });
  }

  // If there are no validation errors, call next() to proceed to the next middleware or route handler
  next();
};

module.exports = { validation, handleValidationErrors };
