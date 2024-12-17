const { check, validationResult } = require('express-validator');

const validateRegister = [
  check('name').notEmpty().withMessage('Username is required'),
  check('email').isEmail().withMessage('Invalid email format'),
  check('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long'),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

module.exports = validateRegister;
