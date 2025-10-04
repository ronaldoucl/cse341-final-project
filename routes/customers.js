const express = require("express");
const router = express.Router();
const customersController = require("../controllers/customers");
const { createCustomerValidation, updateCustomerValidation, deleteCustomerValidation } = require("../validators/customerValidator");
const validate = require("../validators/validate");
const { isAuthenticated } = require("../middleware/authenticate");

router.get("/", customersController.getAll);
router.get("/:id", customersController.getSingle);
router.post("/", isAuthenticated, createCustomerValidation, validate, customersController.createUser);
router.put("/:id", isAuthenticated, updateCustomerValidation, validate, customersController.updateUser);
router.delete("/:id", isAuthenticated, deleteCustomerValidation, validate, customersController.deleteUser);

module.exports = router;