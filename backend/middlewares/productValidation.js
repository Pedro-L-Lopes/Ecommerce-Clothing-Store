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
    // Validação para o campo "price"
    body("price").isNumeric().withMessage("Insira um valor valido."),

    // Validação para o campo "size"
    body("size")
      .optional()
      .isArray({ min: 1 })
      .withMessage("Insira pelo menos um tamanho."),

    // Validação para o campo "description"
    body("description")
      .optional()
      .isString()
      .withMessage("Insira uma descrição válida."),

    // Validação para o campo "onSale"
    body("onSale")
      .optional()
      .isBoolean()
      .withMessage("Insira um valor booleano."),

    // Validação para o campo "salePrice"
    body("salePrice")
      .optional()
      .isNumeric()
      .withMessage("Insira um valor numérico para o salePrice."),

    // Validação para o campo "regularPrice"
    body("regularPrice")
      .optional()
      .isNumeric()
      .withMessage("Insira um valor numérico para o regularPrice."),
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
