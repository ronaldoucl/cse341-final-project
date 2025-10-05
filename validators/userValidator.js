/**
 * @author Lucas Castillo
 */

const { body, param } = require("express-validator");

const createUserValidation = [
  body("username")
    .isString()
    .notEmpty()
    .withMessage("Username is required and must be a string."),
  body("email")
    .isEmail()
    .withMessage("A valid email address is required."),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long."),
 body("phone")
    .optional()
    .trim()
    .isString()
    .matches(/^[0-9+\-()\s]{7,20}$/).withMessage("Phone must contain only numbers, spaces, +, -, () and be 7–20 characters long.")
    .withMessage("Phone must be a string."),
  body("address")
    .optional()
    .isString()
    .withMessage("Address must be a string."),
];

const updateUserValidation = [
  body("username").optional().isString(),
  body("email").optional().isEmail(),
  body("password").optional().isLength({ min: 6 }).withMessage("Password must be at least 6 characters long."),
  body("phone").optional().isString(),
  body("address").optional().isString(),
];

const deleteUserValidation = [
  param("id").isMongoId().withMessage("Invalid user ID format."),
];

module.exports = {
  createUserValidation,
  updateUserValidation,
  deleteUserValidation,
};
