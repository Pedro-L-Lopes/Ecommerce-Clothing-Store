const express = require("express");
const router = express.Router();

const {
  createOrder,
  getAllOrders,
  getClientOrders,
} = require("../controllers/OrderController");
const orderValidation = require("../middlewares/orderValidation");

router.post("/", orderValidation(), createOrder);
router.get("/", getAllOrders);
router.get("/client/:id", getClientOrders);

module.exports = router;
