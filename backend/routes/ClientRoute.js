const express = require("express");
const router = express.Router();

const {
  insertClient,
  getAllClients,
} = require("../controllers/ClientController");
const insertClientValidation = require("../middlewares/ClientValidation");

router.post("/", insertClientValidation(), insertClient);
router.get("/", getAllClients);

module.exports = router;
