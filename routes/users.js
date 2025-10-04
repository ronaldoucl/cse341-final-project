const express = require("express");
const router = express.Router();
const usersController = require("../controllers/users");
const { createUserValidation, updateUserValidation, deleteUserValidation } = require("../validators/userValidator");
const validate = require("../validators/validate");
const { isAuthenticated } = require("../middleware/authenticate");

router.get("/", usersController.getAll);
router.get("/:id", usersController.getSingle);
router.post("/", isAuthenticated, createUserValidation, validate, usersController.createUser);
router.put("/:id", isAuthenticated, updateUserValidation, validate, usersController.updateUser);
router.delete("/:id", isAuthenticated, deleteUserValidation, validate, usersController.deleteUser);

module.exports = router;