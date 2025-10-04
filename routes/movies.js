const express = require("express");
const router = express.Router();
const moviesController = require("../controllers/movies");
const { createMovieValidation, updateMovieValidation, deleteMovieValidation } = require("../validators/movieValidator");
const validate = require("../validators/validate");
const { isAuthenticated } = require("../middleware/authenticate");

router.get("/", moviesController.getAll);
router.get("/:id", moviesController.getSingle);
router.post("/", isAuthenticated, createMovieValidation, validate, moviesController.createMovie);
router.put("/:id", isAuthenticated, updateMovieValidation, validate, moviesController.updateMovie);
router.delete("/:id", isAuthenticated, deleteMovieValidation, validate, moviesController.deleteMovie);

module.exports = router;