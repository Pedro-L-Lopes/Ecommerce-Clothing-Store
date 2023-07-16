const express = require("express");
const router = express.Router();
const {
  getShippingByCep,
  calculatingTermAndPrice,
} = require("../controllers/ShippingController");

router.get("/cep/:cep", getShippingByCep);
router.get("/calcular-preco-prazo/:cep", calculatingTermAndPrice);

module.exports = router;
