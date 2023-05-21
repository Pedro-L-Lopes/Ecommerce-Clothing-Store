// Requisição http que tem haver com os produtos

import { api, requestConfig } from "../utils/config";

// Publicando produto
const publishProduct = async (data, token) => {
  const config = requestConfig("POST", data, token, true);

  try {
    const res = await fetch(api + "/products", config)
      .then((res) => res.json())
      .catch((err) => err);

    return res;
  } catch (error) {
    console.log(error);
  }
};

// Resgatando fotos do usuário
const getUserProducts = async (id, token) => {
  const config = requestConfig("GET", null, token);

  try {
    const res = await fetch(api + "/products/user/" + id, config)
      .then((res) => res.json())
      .catch((err) => err);

    return res;
  } catch (error) {
    console.log(error);
  }
};

const productService = {
  publishProduct,
  getUserProducts,
};

export default productService;
