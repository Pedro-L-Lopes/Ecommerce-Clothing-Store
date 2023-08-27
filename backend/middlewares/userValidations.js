const { body } = require("express-validator"); // Entrega tudo que vem no corpo da requisição

// Validação da criação e usuário
const userCreateValidation = () => {
  return [
    // Retorna alguns erros baseado no body
    body("name")
      .isString()
      .withMessage("O nome é obrigatório!")
      .isLength({ min: 3 })
      .withMessage("O nome precisa ter no mínimo 3 caracteres!"),
    body("email")
      .isString()
      .withMessage("Email invalido!")
      .isEmail()
      .withMessage("Insira um email valido!"),
    body("password")
      .isString()
      .withMessage("Senha invalida")
      .isLength({ min: 5 })
      .withMessage("A senha precisa ter no mínimo 5 carcteres!"),
    body("confirmPassword")
      .isString()
      .withMessage("Confirme a sua senha!")
      .custom((value, { req }) => {
        // Value é o valor resgatado nesse campo
        if (value != req.body.password) {
          throw new Error("As senhas precisam ser iguais!");
        }
        return true;
      }),
  ];
};

// Validação de login
const loginValidation = () => {
  return [
    body("email")
      .isLength()
      .withMessage("Coloque seu email!")
      .isEmail()
      .withMessage("Insira um email valido!"),
    body("password").isLength().withMessage("Insira a senha!"),
  ];
};

// Validação de atualização
const userUpdateValidation = () => {
  return [
    body("name")
      .optional()
      .isLength({ min: 3 })
      .withMessage("O nome precisa ter no mínimo 3 carcteres!"),
    body("password")
      .optional()
      .isLength({ min: 5 })
      .withMessage("A senha precisa ter no mínimo 5 caracteres!"),
    body("currentPassword")
      .optional()
      .isLength({ min: 5 })
      .withMessage("A senha precisa ter no mínimo 5 caracteres!"),
  ];
};

module.exports = {
  userCreateValidation,
  loginValidation,
  userUpdateValidation,
};
