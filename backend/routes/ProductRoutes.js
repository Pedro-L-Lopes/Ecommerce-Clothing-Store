const express = require("express");
const router = express.Router();

// Controller
const {
  createProduct,
  deleteProduct,
  getAllProducts,
  getUserProducts,
  getProductById,
  updateProduct,
} = require("../controllers/ProductController");

// Middlewares
const {
  productInsertValidation,
  productUpdateValidation,
} = require("../middlewares/productValidation");
const authGuard = require("../middlewares/authGuard");
const validate = require("../middlewares/handleValidation");
const { imageUploadProducts } = require("../middlewares/imageUpload");

// Routes // Deixar nessa ordem pois dar algum erro
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
router.get("/user/:id", authGuard, getUserProducts); // Retirar authGuard, usuário não precisará estar logado para ver produtos
router.get("/:id", authGuard, getProductById); // Retirar authGuard
router.put(
  "/:id",
  authGuard,
  productUpdateValidation(),
  validate,
  updateProduct
); // Manter authGuard

module.exports = router;
