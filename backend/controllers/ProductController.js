const Product = require("../models/Product");
const User = require("../models/User");

const mongoose = require("mongoose");

// Inserindo produto com um usuário relacionado a ele // Insert Photo
const createProduct = async (req, res) => {
  const { name } = req.body;

  const images = req.files.map((file) => ({ filename: file.filename }));

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
    return;
  }

  res.status(201).json(newProduct);
};

// Removendo produto do banco de dados
const deleteProduct = async (req, res) => {
  const { id } = req.params; // Pegando o id do produto pela url

  const reqUser = req.user; // pegando usuário da requisição

  try {
    const product = await Product.findById(new mongoose.Types.ObjectId(id)); // Pegando produto do model  // Mudadno tipo do id que chega para ObjectId

    // Chechando se o produto existe
    if (!product) {
      res.status(404).json({ errors: ["Produto não encontrado."] });
      return;
    }

    // Verificando se o produto pertence ao usuário
    if (!product.userId.equals(reqUser._id)) {
      res.status(422).json({
        errors: ["Ocorreu um erro, por favor tente novamente mais tarde."],
      });
    }

    await Product.findByIdAndDelete(product._id);

    res
      .status(200)
      .json({ id: product._id, message: "Foto excluída com sucesso." });
  } catch (error) {
    res.status(404).json({ errors: ["Produto não encontrado."] });
    return;
  }
};

module.exports = {
  createProduct,
  deleteProduct,
};
