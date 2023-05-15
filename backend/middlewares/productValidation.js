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
      if (!req.files || Object.keys(req.files).length === 0) {
        throw new Error("Insira pelo menos uma imagem.");
      }
      if (Object.keys(req.files).length > 3) {
        throw new Error("Só é possível adicionar até 3 imagens."); // Não está funcionando, quando add mais de 3
      } //quebra a aplicação
      return true;
    }),
  ];
};

const productUpdateValidation = () => {
  return [
    body("name")
      .notEmpty()
      .withMessage("Insira o nome do produto")
      .isString()
      .withMessage("Por favor insira o título!")
      .isLength({ min: 3 })
      .withMessage("O nome precisa ter no mínimo 3 carcteres!"),
  ];
};

module.exports = {
  productInsertValidation, 
  productUpdateValidation,
};
