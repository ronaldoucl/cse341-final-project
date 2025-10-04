const express = require("express");
const router = express.Router();
const seriesController = require("../controllers/series");
const { createSeriesValidation, updateSeriesValidation, deleteSeriesValidation } = require("../validators/seriesValidator");
const validate = require("../validators/validate");
const { isAuthenticated } = require("../middleware/authenticate");

router.get("/", seriesController.getAll);
router.get("/:id", seriesController.getSingle);
router.post("/", isAuthenticated, createSeriesValidation, validate, seriesController.createSeries);
router.put("/:id", isAuthenticated, updateSeriesValidation, validate, seriesController.updateSeries);
router.delete("/:id", isAuthenticated, deleteSeriesValidation, validate, seriesController.deleteSeries);

module.exports = router;