// Requisição http que tem haver com os produtos

import { api, requestConfig } from "../utils/config";

// Publicando produto
const publishProduct = async (data, token) => {
  const config = requestConfig("POST", data, token, true);

  try {
    const res = await fetch(api, "/products", config)
      .then((res) => res.json())
      .catch((err) => err);

    return res;
  } catch (error) {
    console.log(error);
  }
};

const productService = {
  publishProduct,
};

export default productService;
