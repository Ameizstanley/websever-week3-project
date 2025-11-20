const {body, validationResult, param} = require('express-validator');

const validate = {}

validate.createCustomerRules = () => {
    return [
        body('firstName')
    .trim()
    .notEmpty()
    .withMessage('First name is required')
    .isLength({ min: 2, max: 50 })
    .withMessage('First name must be between 2 and 50 characters')
    .matches(/^[a-zA-Z\s'-]+$/)
    .withMessage('First name can only contain letters, spaces, hyphens, and apostrophes'),
  
  // Last Name validation
  body('lastName')
    .trim()
    .notEmpty()
    .withMessage('Last name is required')
    .isLength({ min: 2, max: 50 })
    .withMessage('Last name must be between 2 and 50 characters')
    .matches(/^[a-zA-Z\s'-]+$/)
    .withMessage('Last name can only contain letters, spaces, hyphens, and apostrophes'),
  
  // Email validation
  body('email')
    .trim()
    .notEmpty()
    .withMessage('Email is required')
    .isEmail()
    .withMessage('Must be a valid email address')
    .normalizeEmail()
    .toLowerCase(),
  
  // Phone validation
  body('phone')
    .trim()
    .notEmpty()
    .withMessage('Phone number is required')
    .matches(/^[+]?[(]?[0-9]{1,4}[)]?[-\s.]?[(]?[0-9]{1,4}[)]?[-\s.]?[0-9]{1,9}$/)
    .withMessage('Must be a valid phone number format (e.g., +1-555-0203)'),
  
  // Date of Birth validation
  body('dateOfBirth')
    .notEmpty()
    .withMessage('Date of birth is required')
    .isISO8601()
    .withMessage('Date of birth must be in valid date format (YYYY-MM-DD)')
    .custom((value) => {
      const birthDate = new Date(value);
      const today = new Date();
      const age = today.getFullYear() - birthDate.getFullYear();
      
      // Must be at least 18 years old
      if (age < 18) {
        throw new Error('Customer must be at least 18 years old');
      }
      
      // Must not be more than 120 years old
      if (age > 120) {
        throw new Error('Invalid date of birth');
      }
      
      return true;
    }),
  
  // Customer Since validation
  body('customerSince')
    .optional()
    .isISO8601()
    .withMessage('Customer since date must be in valid date format (YYYY-MM-DD)')
    .custom((value) => {
      const customerDate = new Date(value);
      const today = new Date();
      
      // Cannot be in the future
      if (customerDate > today) {
        throw new Error('Customer since date cannot be in the future');
      }
      
      return true;
    }),
  
  // Status validation
  body('status')
    .optional()
    .isIn(['active', 'inactive', 'suspended'])
    .withMessage('Status must be one of: active, inactive, suspended'),
  
  // Tier validation
  body('tier')
    .optional()
    .isIn(['bronze', 'silver', 'gold', 'platinum'])
    .withMessage('Tier must be one of: bronze, silver, gold, platinum'),
  
  // Total Purchases validation
  body('totalPurchases')
    .optional()
    .isInt({ min: 0 })
    .withMessage('Total purchases must be a non-negative integer')
    .toInt(),
  
  // Total Spent validation
  body('totalSpent')
    .optional()
    .isFloat({ min: 0 })
    .withMessage('Total spent must be a non-negative number')
    .custom((value) => {
      // Check if it has maximum 2 decimal places
      const decimalPlaces = (value.toString().split('.')[1] || '').length;
      if (decimalPlaces > 2) {
        throw new Error('Total spent can have maximum 2 decimal places');
      }
      return true;
    })
    .toFloat(),
    ]
}

validate.updateCustomerRules = () => {
    return [
        body('firstName')
    .optional()
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage('First name must be between 2 and 50 characters')
    .matches(/^[a-zA-Z\s'-]+$/)
    .withMessage('First name can only contain letters, spaces, hyphens, and apostrophes'),
  
  body('lastName')
    .optional()
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage('Last name must be between 2 and 50 characters')
    .matches(/^[a-zA-Z\s'-]+$/)
    .withMessage('Last name can only contain letters, spaces, hyphens, and apostrophes'),
  
  body('email')
    .optional()
    .trim()
    .isEmail()
    .withMessage('Must be a valid email address')
    .normalizeEmail()
    .toLowerCase(),
  
  body('phone')
    .optional()
    .trim()
    .matches(/^[+]?[(]?[0-9]{1,4}[)]?[-\s.]?[(]?[0-9]{1,4}[)]?[-\s.]?[0-9]{1,9}$/)
    .withMessage('Must be a valid phone number format'),
  
  body('dateOfBirth')
    .optional()
    .isISO8601()
    .withMessage('Date of birth must be in valid date format (YYYY-MM-DD)')
    .custom((value) => {
      const birthDate = new Date(value);
      const today = new Date();
      const age = today.getFullYear() - birthDate.getFullYear();
      
      if (age < 18) {
        throw new Error('Customer must be at least 18 years old');
      }
      
      if (age > 120) {
        throw new Error('Invalid date of birth');
      }
      
      return true;
    }),
  
  body('customerSince')
    .optional()
    .isISO8601()
    .withMessage('Customer since date must be in valid date format (YYYY-MM-DD)')
    .custom((value) => {
      const customerDate = new Date(value);
      const today = new Date();
      
      if (customerDate > today) {
        throw new Error('Customer since date cannot be in the future');
      }
      
      return true;
    }),
  
  body('status')
    .optional()
    .isIn(['active', 'inactive', 'suspended'])
    .withMessage('Status must be one of: active, inactive, suspended'),
  
  body('tier')
    .optional()
    .isIn(['bronze', 'silver', 'gold', 'platinum'])
    .withMessage('Tier must be one of: bronze, silver, gold, platinum'),
  
  body('totalPurchases')
    .optional()
    .isInt({ min: 0 })
    .withMessage('Total purchases must be a non-negative integer')
    .toInt(),
  
  body('totalSpent')
    .optional()
    .isFloat({ min: 0 })
    .withMessage('Total spent must be a non-negative number')
    .custom((value) => {
      const decimalPlaces = (value.toString().split('.')[1] || '').length;
      if (decimalPlaces > 2) {
        throw new Error('Total spent can have maximum 2 decimal places');
      }
      return true;
    })
    .toFloat(),
  
  // Ensure at least one field is being updated
  
  
    ]
}


validate.customerIdRules = () => {
    return [
        param('id')
       .trim()
       .notEmpty()
       .withMessage('Customer ID is required')
       .isMongoId()
       .withMessage('Invalid customer ID format')
    ]
}


validate.checkCreateCustomer = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array() });
    }
    next();
}


validate.checkUpdateCustomer = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array() });
    }
    next();
}




validate.checkCustomerId = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array() });
    }
    next();
}

module.exports = validate;
