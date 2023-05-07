const User = require("../models/User");

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const jwtSecret = process.env.JWT_SECRET;


// Função para gerar o token (será reutilizada em algumas funções)
// Espera um id de um usuario
const generateToken = (id) => {
    return jwt.sign({id}, jwtSecret, { // Criando com id do usuario, secret(senha) e o tempo até deslogar sozinho
        expiresIn: "7d"
    })
}

// Regsitrar usuario e logar usuario
const register = async (req, res) => {
    
}