const Product = require("../models/Product");
const User = require("../models/User");

const fs = require("fs");
const path = require("path");

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

    // Remover as fotos do disco
    product.images.forEach((image) => {
      const imagePath = path.join(
        __dirname,
        "../uploads/products",
        image.filename
      );
      fs.unlink(imagePath, (err) => {
        if (err) {
          res.status(500).json({ error: ["Erro ao excluir fotos do disco!"] });
        }
      });
    });

    await Product.findByIdAndDelete(product._id);

    res
      .status(200)
      .json({ id: product._id, message: "Foto excluída com sucesso." });
  } catch (error) {
    res.status(404).json({ errors: ["Produto não encontrado."] });
    return;
  }
};

// Pegando todas os produtos
const getAllProducts = async (req, res) => {
  // Buscando todos os produtos = find({}) // sort() = ordenar  // exec() = executar
  const products = await Product.find({})
    .sort([["createdAt", -1]])
    .exec();

  return res.status(200).json(products);
};

// Pegando fotos do usuário (loja)
const getUserProducts = async (req, res) => {
  const { id } = req.params; // Id da url pois qualquer um pode ver qualquer produto

  const products = await Product.find({ userId: id })
    .sort([["createdAt", -1]])
    .exec();

  return res.status(200).json(products);
};

module.exports = {
  createProduct,
  deleteProduct,
  getAllProducts,
  getUserProducts,
};
