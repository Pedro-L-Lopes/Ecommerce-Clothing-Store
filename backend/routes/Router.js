const express = require("express");
const router = express(); // Chamando essa instancia do express de router

// Disponibilizando rotas para a aplicação
router.use("/api/users", require("./UserRoutes"));
router.use("/api/products", require("./ProductRoutes"));
router.use("/api/shipping", require("./shippingRoutes"));
router.use("/api/client", require("./ClientRoute"));
router.use("/api/order", require("./OrderRoute"));

// Rota de teste
router.get("/", (req, res) => {
  res.send("Api funcionando!");
});

module.exports = router;
