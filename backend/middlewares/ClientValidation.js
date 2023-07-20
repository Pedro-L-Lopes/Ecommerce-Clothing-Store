const { body, validationResult } = require("express-validator");

const insertClientValidation = () => {
  return [
    body("name")
      .notEmpty()
      .withMessage("Insira seu nome completo!")
      .isString()
      .withMessage("Insira seu nome completo!")
      .isLength({ min: 5 })
      .withMessage("Insira seu nome completo!"),
    body("email")
      .notEmpty()
      .withMessage("Email inválido!")
      .isString()
      .withMessage("Insira um email válido!")
      .isEmail()
      .withMessage("Insira um email válido!"),
    body("street")
      .notEmpty()
      .withMessage("Insira o nome da Rua/Avenida!")
      .isString()
      .withMessage("Insira o nome da Rua/Avenida!")
      .isLength({ min: 2 })
      .withMessage("Insira o nome da Rua/Avenida!"),
    body("neighborhood")
      .notEmpty()
      .withMessage("Insira o nome do bairro!")
      .isString()
      .withMessage("Insira o nome do bairro!")
      .isLength({ min: 2 })
      .withMessage("Insira o nome do bairro!"),
    body("houseNumber")
      .notEmpty()
      .withMessage("Insira o número da casa!")
      .isString()
      .withMessage("Insira o número da casa!")
      .isLength({ min: 1 })
      .withMessage("Insira o número da casa!"),
    body("city")
      .notEmpty()
      .withMessage("Insira o nome da cidade!")
      .isString()
      .withMessage("Insira o nome da cidade!")
      .isLength({ min: 2 })
      .withMessage("Insira o nome da cidade!"),
    body("cep")
      .notEmpty()
      .withMessage("Insira o CEP!")
      .isString()
      .withMessage("Insira o CEP!")
      .isLength({ min: 8, max: 8 })
      .withMessage("Insira um CEP válido!"),
    body("phoneNumber")
      .notEmpty()
      .withMessage("Insira o número de telefone!")
      .isString()
      .withMessage("Insira o número de telefone!")
      .isLength({ min: 10 })
      .withMessage("Insira um número de telefone válido!"),
    body("nasc")
      .notEmpty()
      .withMessage("Insira a data de nascimento!")
      .isString()
      .withMessage("Insira a data de nascimento!")
      .isLength({ min: 10, max: 10 })
      .withMessage(
        "Insira uma data de nascimento válida! (Formato: DD/MM/AAAA)"
      ),
    body("gender")
      .notEmpty()
      .withMessage("Selecione o gênero!")
      .isString()
      .withMessage("Selecione o gênero!")
      .isIn(["Masculino", "Feminino", "Outro"])
      .withMessage("Selecione um gênero válido!"),
    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
      }
      next();
    },
  ];
};

module.exports = insertClientValidation;
