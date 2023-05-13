const Product = require("../models/Product");

const mongoose = require("mongoose");

// Inserindo produto com um usuário relacionado a ele // Insert Photo
const createProduct = async (req, res) => {
  const { name } = req.body;

  const image = req.files.filename;

  console.log(req.body);

  res.send("Produto criado");
};

module.exports = {
  createProduct,
};
