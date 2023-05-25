// Requisição http que tem haver com os produtos

import { json } from "react-router-dom";
import { api, requestConfig } from "../utils/config";
import Search from "../pages/Search/Search";

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

// Deletando produto
const deleteProduct = async (id, token) => {
  const config = requestConfig("DELETE", null, token);

  try {
    const res = await fetch(api + `/products/` + id, config)
      .then((res) => res.json())
      .catch((err) => err);

    return res;
  } catch (error) {
    console.log(error);
  }
};

// Atualizando produto
const updateProduct = async (data, id, token) => {
  const config = requestConfig("PUT", data, token);

  try {
    const res = await fetch(api + `/products/` + id, config)
      .then((res) => res.json())
      .catch((err) => err);

    return res;
  } catch (error) {
    console.log(error);
  }
};

// Pegando o produto pelo id
const getProduct = async (id) => {
  const config = requestConfig("GET");

  try {
    const res = await fetch(api + "/products/" + id, config)
      .then((res) => res.json())
      .catch((err) => err);

    return res;
  } catch (error) {
    console.log(error);
  }
};

// Pegando todos os produtos
const getAllProducts = async () => {
  const config = requestConfig("GET");

  try {
    const res = await fetch(api + "/products", config)
      .then((res) => res.json())
      .catch((err) => err);

    return res;
  } catch (error) {
    console.log(error);
  }
};

// Buscando produtos pelo nome
const searchProducts = async (query) => {
  const config = requestConfig("GET");

  try {
    const res = await fetch(api + "/products/search?q=" + query, config)
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
  deleteProduct,
  updateProduct,
  getProduct,
  getAllProducts,
  searchProducts,
};

export default productService;
