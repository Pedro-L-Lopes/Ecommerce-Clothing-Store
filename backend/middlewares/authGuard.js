// Bloquear usuários não autenticados

const User = require("../models/User");
const jwt = require("jsonwebtoken"); // Fazer comparação do token
const jwtSecret = process.env.JWT_SECRET;

const authGuard = async (req, res, next) => {
  // Toda requisição que continver esse token os headers terão ["authorization"]
  const authHeader = req.headers["authorization"]; //conexões que não tem o authorization não tem o token

  // Verificando se o authHeadder existe
  // Pegando a segunda parte, descartando o bearer  // split("") == dividir em um array de duas partes
  const token = authHeader && authHeader.split(" ")[1];

  // Checando se o header tem o token
  if (!token) return res.status(401).json({ errors: ["Acesso negado!"] });

  // Checando se o token é valido
  try {
    // Retorna um objeto com todas as propriedades que tem no token (que foi criado no generate token lá no user controle, por isso tem o id em verified.id)
    const verified = jwt.verify(token, jwtSecret); // Comparando o token que veio da req com o jwt

    // Jogando usuário na req para não precisar ficar fazendo consultas ao banco
    req.user = await User.findById(verified.id).select("-password"); // Tirando senha do retorno

    next();
  } catch (error) {
    res.status(401).json({ errors: ["Token Inválido!"] });
  }
};

module.exports = authGuard;
