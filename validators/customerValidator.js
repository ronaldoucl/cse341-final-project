/**
 * @author Ronaldo Campos
 */

const { body } = require("express-validator");

const createCustomerValidation = [
  body("name")
    .isString()
    .notEmpty()
    .withMessage("Name is required and must be a string."),
  body("email")
    .isEmail()
    .notEmpty()
    .withMessage("Valid email is required."),
  body("phone")
    .optional()
    .isString()
    .withMessage("Phone must be a string."),
  body("address")
    .optional()
    .isString()
    .withMessage("Address must be a string."),
  body("notes")
    .optional()
    .isString()
    .withMessage("Notes must be a string."),
  body("active")
    .optional()
    .isBoolean()
    .withMessage("Active must be true or false."),
];

const updateCustomerValidation = [
  body("name").optional().isString(),
  body("email").optional().isEmail(),
  body("phone").optional().isString(),
  body("address").optional().isString(),
  body("notes").optional().isString(),
  body("active").optional().isBoolean(),
];

const deleteCustomerValidation = [
  param("id")
    .isMongoId()
    .withMessage("Invalid customer ID format."),
];

module.exports = {
  createCustomerValidation,
  updateCustomerValidation,
  deleteCustomerValidation
};