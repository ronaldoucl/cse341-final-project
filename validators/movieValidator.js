/**
 * @author Ronaldo Campos
 */

const { body, param } = require("express-validator");

const createMovieValidation = [
  body("title")
    .isString()
    .notEmpty()
    .withMessage("Title is required and must be a string."),
  body("director")
    .isString()
    .notEmpty()
    .withMessage("Director is required and must be a string."),
  body("genre")
    .optional()
    .isString()
    .withMessage("Genre must be a string."),
  body("releaseYear")
    .optional()
    .isInt({ min: 1800, max: new Date().getFullYear() })
    .withMessage("Release year must be a valid year."),
  body("rating")
    .optional()
    .isFloat({ min: 0, max: 10 })
    .withMessage("Rating must be a number between 0 and 10."),
  body("description")
    .optional()
    .isString()
    .withMessage("Description must be a string."),
  body("available")
    .optional()
    .isBoolean()
    .withMessage("Available must be true or false."),
];

const updateMovieValidation = [
  body("title").optional().isString(),
  body("director").optional().isString(),
  body("genre").optional().isString(),
  body("releaseYear").optional().isInt({ min: 1800, max: new Date().getFullYear() }),
  body("rating").optional().isFloat({ min: 0, max: 10 }),
  body("description").optional().isString(),
  body("available").optional().isBoolean(),
];

const deleteMovieValidation = [
  param("id")
    .isMongoId()
    .withMessage("Invalid movie ID format."),
];

module.exports = {
  createMovieValidation,
  updateMovieValidation,
  deleteMovieValidation,
};
