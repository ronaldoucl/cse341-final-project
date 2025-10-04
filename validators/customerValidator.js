/**
 * @author Ronaldo Campos
 */

const { body, param } = require("express-validator");

const createCustomerValidation = [
  body("firstName")
    .trim()
    .notEmpty().withMessage("First Name is required.")
    .isString().withMessage("First Name must be a string.")
    .isLength({ min: 2, max: 100 }).withMessage("Name must be between 2 and 100 characters."),

  body("lastName")
    .trim()
    .notEmpty().withMessage("Last Name is required.")
    .isString().withMessage("Last Name must be a string.")
    .isLength({ min: 2, max: 100 }).withMessage("Name must be between 2 and 100 characters."),    

  body("email")
    .trim()
    .notEmpty().withMessage("Email is required.")
    .isEmail().withMessage("Email must be valid."),

  body("phone")
    .optional()
    .trim()
    .matches(/^[0-9+\-()\s]{7,20}$/).withMessage("Phone must contain only numbers, spaces, +, -, () and be 7–20 characters long."),

  body("address")
    .optional()
    .trim()
    .isString().withMessage("Address must be a string.")
    .isLength({ max: 200 }).withMessage("Address cannot exceed 200 characters."),

  body("active")
    .optional()
    .isBoolean().withMessage("Active must be true or false."),
];

const updateCustomerValidation = [
  body("firstName")
    .optional()
    .trim()
    .isString().withMessage("First Name must be a string.")
    .isLength({ min: 2, max: 100 }).withMessage("Name must be between 2 and 100 characters."),

  body("lastName")
    .optional()
    .trim()
    .isString().withMessage("Last Name must be a string.")
    .isLength({ min: 2, max: 100 }).withMessage("Name must be between 2 and 100 characters."),

  body("email")
    .optional()
    .trim()
    .isEmail().withMessage("Email must be valid."),

  body("phone")
    .optional()
    .trim()
    .matches(/^[0-9+\-()\s]{7,20}$/).withMessage("Phone must contain only numbers, spaces, +, -, () and be 7–20 characters long."),

  body("address")
    .optional()
    .trim()
    .isString().withMessage("Address must be a string.")
    .isLength({ max: 200 }).withMessage("Address cannot exceed 200 characters."),

  body("active")
    .optional()
    .isBoolean().withMessage("Active must be true or false."),
];

const deleteCustomerValidation = [
  param("id")
    .notEmpty().withMessage("Customer ID is required.")
    .isMongoId().withMessage("Invalid customer ID format."),
];

module.exports = {
  createCustomerValidation,
  updateCustomerValidation,
  deleteCustomerValidation,
};
