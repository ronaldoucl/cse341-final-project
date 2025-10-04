/**
 * @author Lucas Castillo
 */

const { body, param } = require("express-validator");

const createSeriesValidation = [
  body("title")
    .isString()
    .notEmpty()
    .withMessage("Title is required and must be a string."),
  body("genre")
    .optional()
    .isString()
    .withMessage("Genre must be a string."),
  body("seasons")
    .optional()
    .isInt({ min: 1 })
    .withMessage("Seasons must be a positive integer."),
  body("episodes")
    .optional()
    .isInt({ min: 0 })
    .withMessage("Episodes must be a non-negative integer."),
  body("description")
    .optional()
    .isString()
    .withMessage("Description must be a string."),
  body("releaseYear")
    .optional()
    .isInt({ min: 1900, max: new Date().getFullYear() })
    .withMessage("Release year must be a valid year."),
  body("available")
    .optional()
    .isBoolean()
    .withMessage("Available must be true or false."),
];

const updateSeriesValidation = [
  body("title").optional().isString(),
  body("genre").optional().isString(),
  body("seasons").optional().isInt({ min: 1 }),
  body("episodes").optional().isInt({ min: 0 }),
  body("description").optional().isString(),
  body("releaseYear").optional().isInt({ min: 1900, max: new Date().getFullYear() }),
  body("available").optional().isBoolean(),
];

const deleteSeriesValidation = [
  param("id").isMongoId().withMessage("Invalid series ID format."),
];

module.exports = {
  createSeriesValidation,
  updateSeriesValidation,
  deleteSeriesValidation,
};
