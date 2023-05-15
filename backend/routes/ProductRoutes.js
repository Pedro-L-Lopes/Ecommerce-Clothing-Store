const express = require("express");
const router = express.Router();

// Controller
const {
  createProduct,
  deleteProduct,
  getAllProducts,
} = require("../controllers/ProductController");

// Middlewares
const { productInsertValidation } = require("../middlewares/productValidation");
const authGuard = require("../middlewares/authGuard");
const validate = require("../middlewares/handleValidation");
const { imageUploadProducts } = require("../middlewares/imageUpload");

// Routes
router.post(
  "/",
  authGuard,
  imageUploadProducts,
  productInsertValidation(),
  validate,
  createProduct // InsertPhoto
);
router.delete("/:id", authGuard, deleteProduct);
router.get("/", authGuard, getAllProducts); // Retirar authGuard, usuário não precisará estar logado para ver produtos


module.exports = router;
