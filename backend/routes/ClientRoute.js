const express = require("express");
const router = express.Router();

const {
  insertClient,
  getAllClients,
  getClientById,
} = require("../controllers/ClientController");
const insertClientValidation = require("../middlewares/ClientValidation");

router.post("/", insertClientValidation(), insertClient);
router.get("/", getAllClients);
router.get("/:id", getClientById);

module.exports = router;
