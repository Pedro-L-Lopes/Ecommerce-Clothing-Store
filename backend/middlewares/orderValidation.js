const { body, validationResult } = require("express-validator");

const createOrderValidation = () => {
  return [
    body("clientId")
      .notEmpty()
      .withMessage("ID do cliente não fornecido!")
      .isMongoId()
      .withMessage("ID do cliente inválido!"),
    body("clientName").notEmpty().withMessage("Nome do cliente não fornecido!"),
    body("products") 
      .isArray({ min: 1 })
      .withMessage("Insira pelo menos um produto no pedido!")
      .custom((products) => {
        // Verificar se cada produto tem os campos obrigatórios
        for (const product of products) {
          if (!product.productId || !product.quantity) {
            return false;
          }
        }
        return true;
      })
      .withMessage("Cada produto deve conter 'productId' e 'quantity'!"),
    body("products.*.productId")
      .notEmpty()
      .withMessage("ID do produto não fornecido!")
      .isMongoId()
      .withMessage("ID do produto inválido!"),
    body("products.*.quantity")
      .notEmpty()
      .withMessage("Quantidade do produto não fornecida!")
      .isInt({ min: 1 })
      .withMessage(
        "A quantidade do produto deve ser um número inteiro maior que zero!"
      ),
    body("products.*.size")
      .optional()
      .isString()
      .withMessage("O tamanho do produto deve ser uma string!"),
    body("deliveryAddress")
      .notEmpty()
      .withMessage("Insira o endereço de entrega!")
      .isString()
      .withMessage("Insira um endereço de entrega válido!")
      .isLength({ min: 5 })
      .withMessage("Insira um endereço de entrega válido!"),
    body("shippingType")
      .notEmpty()
      .withMessage("Selecione o tipo de envio!")
      .isString()
      .withMessage("Selecione o tipo de envio!")
      .isIn(["PAC", "SEDEX"])
      .withMessage("Selecione um tipo de envio válido!"),
    body("shippingCost").notEmpty().withMessage("Insira o custo do envio!"),
    body("paymentMethod")
      .notEmpty()
      .withMessage("Insira a forma de pagamento!")
      .isString()
      .withMessage("Insira a forma de pagamento!"),
    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
      }
      next();
    },
  ];
};

module.exports = createOrderValidation;
