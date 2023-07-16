// Requisição http que tem haver com os produtos
import { api, requestConfig } from "../utils/config";

const getShippingByCep = async (cep) => {
  const config = requestConfig("GET");

  try {
    const res = await fetch(api + "/shipping/cep/" + cep, config)
      .then((res) => res.json())
      .catch((err) => err);

    return res;
  } catch (error) {
    console.error("Erro ao buscar informações do CEP:", error);
  }
};

const calculatingTermAndPrice = async (cep) => {
  const config = requestConfig("GET");

  try {
    const res = await fetch(
      api + "/shipping/calcular-preco-prazo/" + cep,
      config
    )
      .then((res) => res.json())
      .catch((err) => err);

    return res;
  } catch (error) {
    console.error("Erro ao buscar informações.", error);
  }
};

const shippingService = {
  getShippingByCep,
  calculatingTermAndPrice,
};

export default shippingService;
