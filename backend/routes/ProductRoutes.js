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
  searchProducts,
} = require("../controllers/ProductController");

// Middlewares
const {
  productInsertValidation,
  productUpdateValidation,
} = require("../middlewares/productValidation");
const authGuard = require("../middlewares/authGuard");
const validate = require("../middlewares/handleValidation");
const {
  imageUploadProducts,
  compressProductImagesMiddleware,
} = require("../middlewares/imageUpload");

// Routes // Deixar nessa ordem pois dar algum erro
router.post(
  "/",
  authGuard,
  imageUploadProducts,
  compressProductImagesMiddleware,
  productInsertValidation(),
  validate,
  createProduct // InsertPhoto
);
router.get("/search", searchProducts); // Retirar authGuard
router.delete("/:id", authGuard, deleteProduct);
router.get("/", getAllProducts); // Retirar authGuard, usuário não precisará estar logado para ver produtos
router.get("/user/:id", getUserProducts); // Retirar authGuard, usuário não precisará estar logado para ver produtos
router.get("/:id", getProductById); // Retirar authGuard
router.put(
  "/:id",
  authGuard,
  productUpdateValidation(),
  validate,
  updateProduct
); // Manter authGuard

module.exports = router;
