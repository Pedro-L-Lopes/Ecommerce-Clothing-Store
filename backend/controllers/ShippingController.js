const { consultarCep, calcularPrecoPrazo } = require("correios-brasil");
const { response } = require("../routes/Router");

const getShippingByCep = (req, res) => {
  const cep = req.params.cep;

  consultarCep(cep)
    .then((response) => {
      res.json(response);
    })
    .catch((error) => {
      res.status(500).json({ error: "Falha ao buscar informações do CEP" });
    });
};
const calculatingTermAndPrice = (req, res) => {
  const cepDestino = req.params.cep;

  const args = {
    sCepOrigem: "35010151",
    sCepDestino: cepDestino,
    nVlPeso: "1",
    nCdFormato: "1",
    nVlComprimento: "20",
    nVlAltura: "20",
    nVlLargura: "20",
    nCdServico: ["04014", "04510"],
    nVlDiametro: "0",
  };

  calcularPrecoPrazo(args)
    .then((response) => {
      res.json(response);
    })
    .catch((error) => {
      res.status(500).json({ error: "Falha ao buscar informações" });
    });
};

module.exports = {
  getShippingByCep,
  calculatingTermAndPrice,
};
