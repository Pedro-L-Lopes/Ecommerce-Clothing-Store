const Product = require("../models/Product");
const User = require("../models/User");

const mongoose = require("mongoose");

// Inserindo produto com um usuário relacionado a ele // Insert Photo
const createProduct = async (req, res) => {
  const { name } = req.body;

  const images = req.files.map((file) => ({filename: file.filename}));

  const reqUser = req.user; // Usuário da requisição

  const user = await User.findById(reqUser._id);

  // Criando produto
  const newProduct = await Product.create({
    images,
    name,
    userId: user._id,
    userName: user.name,
  });

  // Verificando se o produto foi criado com sucesso, retorna o dado
  if (!newProduct) {
    res.status(422).json({
      errors: ["Houve um problema, por favor tente novamente mais tarde."],
    });
  }

  res.status(201).json(newProduct);
};

module.exports = {
  createProduct,
};
