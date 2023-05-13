const express = require("express");
const router = express.Router();

// Controller

// Middlewares
const { productInsertValidation } = require("../middlewares/productValidation");
const authGuard = require("../middlewares/authGuard");
const validate = require("../middlewares/handleValidation");

// Routes

module.exports = router;
