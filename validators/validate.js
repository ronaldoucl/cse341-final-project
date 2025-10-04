const { validationResult } = require("express-validator");

/**
 * Middleware to handle validation results from express-validator
 */
function validate(req, res, next) {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array().map(err => ({
        field: err.param,
        message: err.msg,
      })),
    });
  }

  next();
}

module.exports = validate;