const express = require("express");
const router = express.Router();

const {
  createOrder,
  getAllOrders,
  getClientOrders,
  getOrderById,
  updateOrder,
} = require("../controllers/OrderController");
const orderValidation = require("../middlewares/orderValidation");
const authGuard = require("../middlewares/authGuard");

router.post("/", orderValidation(), createOrder);
router.get("/", authGuard, getAllOrders);
router.get("/client/:id", authGuard, getClientOrders);
router.get("/:id", authGuard, getOrderById);
router.put("/:id", authGuard, updateOrder);

module.exports = router;
