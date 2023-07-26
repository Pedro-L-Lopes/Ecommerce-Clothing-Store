import { api, requestConfig } from "../utils/config";

const createOrder = async (data) => {
  const config = requestConfig("POST", data);

  try {
    const res = await fetch(api + "/order/", config)
      .then((res) => res.json())
      .catch((err) => err);

    if (res) {
      localStorage.setItem("order", JSON.stringify(res));
    }

    return res;
  } catch (error) {
    console.log(error);
  }
};

const getAllOrders = async (token) => {
  const config = requestConfig("GET", null, token);
  try {
    const res = await fetch(api + "/order/", config)
      .then((res) => res.json())
      .catch((err) => err);

    return res;
  } catch (error) {
    console.log(error);
  }
};

const updateOrder = async (data, id, token) => {
  const config = requestConfig("PUT", data, token);

  try {
    const res = await fetch(api + "/order/" + id, config)
      .then((res) => res.json())
      .catch((err) => err);

    return res;
  } catch (error) {
    console.log(error);
  }
};

const getOrderById = async (id, token) => {
  const config = requestConfig("GET", null, token);

  try {
    const res = await fetch(api + "/order/" + id, config)
      .then((res) => res.json())
      .catch((err) => err);

    return res;
  } catch (error) {
    console.log(error);
  }
};

const orderService = {
  createOrder,
  getAllOrders,
  updateOrder,
  getOrderById,
};

export default orderService;
