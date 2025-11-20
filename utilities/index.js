const {body, validationResult, param} = require('express-validator');

const validate = {}

validate.createSubscriberRules = () => {
    return [
        // Check firstName
  body('firstName')
    .trim()                                    // Remove extra spaces
    .notEmpty()                                // Must not be empty
    .withMessage('First name is required')     // Error message if it fails
    .isLength({ min: 2, max: 50 })            // Length between 2-50 characters
    .withMessage('First name must be 2-50 characters'),
  
  // Check lastName
  body('lastName')
    .trim()
    .notEmpty()
    .withMessage('Last name is required')
    .isLength({ min: 2, max: 50 })
    .withMessage('Last name must be 2-50 characters'),
  
  // Check email
  body('email')
    .trim()
    .notEmpty()
    .withMessage('Email is required')
    .isEmail()                                // Must be valid email format
    .withMessage('Must be a valid email address'),
  
  // Check phone (optional field)
  body('phone')
    .optional()                               // This field is not required
    .trim()
    .isMobilePhone()                          // Must be valid phone number
    .withMessage('Must be a valid phone number'),
  
  // Check plan
  body('plan')
    .optional()
    .isIn(['basic', 'standard', 'premium'])   // Must be one of these values
    .withMessage('Plan must be basic, standard, or premium'),
    ]
}

validate.updateSubscriberRules = () => {
    return [
        body('firstName')
    .optional()
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage('First name must be 2-50 characters'),
  
  body('lastName')
    .optional()
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage('Last name must be 2-50 characters'),
  
  body('email')
    .optional()
    .trim()
    .isEmail()
    .withMessage('Must be a valid email address'),
  
  body('plan')
    .optional()
    .isIn(['basic', 'standard', 'premium'])
    .withMessage('Plan must be basic, standard, or premium'),
  
    ]
}

validate.validateIdRules = () => {
    return [
      param('id')
    .trim()
    .notEmpty()
    .withMessage('ID is required')
    .isMongoId()                              // Must be valid MongoDB ID
    .withMessage('Invalid ID format')

    ]
}


validate.checkCreateSubscriber = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array() });
    }
    next();
}


validate.checkUpdateSubscriber = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array() });
    }
    next();
}




validate.checkId = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array() });
    }
    next();
}






module.exports = validate;