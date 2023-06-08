const User = require("../models/User");

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { default: mongoose } = require("mongoose");

const jwtSecret = process.env.JWT_SECRET;

// Gerando token de usuário
const generateToken = (id) => {
  return jwt.sign({ id }, jwtSecret, {
    expiresIn: "7d",
  });
};

// Registrando e logando usuário
const register = async (req, res) => {
  const { name, email, password } = req.body;

  // Checando se usuário existe
  const user = await User.findOne({ email });

  if (user) {
    res.status(422).json({ errors: ["Email já cadastrado!"] });
    return;
  }

  // Gerando senha criptografada (hash utilizando bcrypt)
  // O salt vai dar uma "poluida" na string
  const salt = await bcrypt.genSalt(); // genSalt() gera a string aleatória
  const passwordHash = await bcrypt.hash(password, salt); // Gera uma senha aleatória muito loka

  // Criando usuário
  const newUser = await User.create({
    name,
    email,
    password: passwordHash, // Salvando a senha gerada
  });

  // Usuário foi criado com sucesso, retorna o token
  if (!newUser) {
    res
      .status(422)
      .json({ errors: ["Hove um erro, por favor tente mais tarde."] });
    return;
  }

  res.status(201).json({
    _id: newUser._id,
    token: generateToken(newUser._id),
  });
};

// Login
const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  // Checando se usuário existe
  if (!user) {
    res.status(404).json({ errors: ["Usuário não encontrado!"] });
    return;
  }

  // Checando se a senha foi fornecida
  if (!password) {
    res.status(422).json({ errors: ["Por favor insira a senha!"] });
    return;
  }

  // checando se as senhas batem
  if (bcrypt.compareSync(password, user.password)) {
    // Retorna usuário com token
    res.status(200).json({
      _id: user._id,
      profileImage: user.profileImage,
      token: generateToken(user._id),
    });
  } else {
    res.status(422).json({ errors: ["Senha inválida!"] });
    return;
  }
};

// Pegar usuário conectado // Acessar perfil do usuário
const getCurrentUser = async (req, res) => {
  const user = req.user; // Usuário foi colocado na req no middleware de auth (authguard)

  res.status(200).json(user);
};

// Atualização de usuário
const update = async (req, res) => {
  const { name, email, currentPassword, password } = req.body;
  const reqUser = req.user;

  const user = await User.findById(new mongoose.Types.ObjectId(reqUser._id));

  if (!user) {
    res.status(404).json({ errors: ["Usuário não encontrado!"] });
    return;
  }

  // Verificar se a senha atual está correta
  if (!bcrypt.compareSync(currentPassword, user.password)) {
    res.status(422).json({ errors: ["Senha atual incorreta!"] });
    return;
  }

  if (name) {
    user.name = name;
  }

  if (email) {
    user.email = email;
  }

  if (password) {
    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);
    user.password = passwordHash;
  }

  try {
    await user.save();
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ errors: ["Erro ao atualizar usuário!"] });
  }
};

// Pegando usuário pelo Id
const getUserById = async (req, res) => {
  const { id } = req.params; // Pegando id da url pois é um GET

  try {
    // Tenta achar o usuário
    const user = await User.findById(new mongoose.Types.ObjectId(id)).select(
      "-password"
    );

    // Checando se o usuário existe
    if (!user) {
      res.status(404).json({ errors: ["Usuário não encontrado 2"] }); // Id nada haver
      return;
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(422).json({ errors: ["Usuário não encontrado!"] }); // Id no formato certo mas usuário não encontrado
  }
};

module.exports = {
  register,
  login,
  getCurrentUser,
  update,
  getUserById,
};
