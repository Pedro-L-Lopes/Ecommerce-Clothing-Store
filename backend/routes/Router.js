const express = require("express");
const router = express(); // Chamando essa instancia do express de router

// Rota de teste
router.get("/", (req, res) => {
  res.send("Api funcionando!");
});

module.exports = router;
