const { body } = require("express-validator");

const productInsertValidation = () => {
  return [
    body("name")
      .not() // Verifica se o valor do campo não é igual ao valor especificado
      .equals("undefined")
      .withMessage("Insira o nome do produto!")
      .isString()
      .withMessage("Insira o nome do produto!")
      .isLength({ min: 3 })
      .withMessage("O nome precisa ter no mínimo 3 carcteres!"),
    body("images").custom((value, { req }) => {
      if (!req.files) {
        throw new Error("Insira pelo menos uma imagem.");
      }
      return true;
    }),
  ];
};

module.exports = {
  productInsertValidation,
};
