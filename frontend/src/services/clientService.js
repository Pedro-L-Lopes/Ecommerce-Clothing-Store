import { api, requestConfig } from "../utils/config";

const insertClient = async (data) => {
  const config = requestConfig("POST", data);

  try {
    const res = await fetch(api + "/client/", config)
      .then((res) => res.json())
      .catch((err) => err);

    if (res) {
      localStorage.setItem("client", JSON.stringify(res));
    }

    return res;
  } catch (error) {
    console.log(error);
  }
};

const getClientById = async (id) => {
  const config = requestConfig("GET");

  try {
    const res = await fetch(api + "/client/" + id, config)
      .then((res) => res.json())
      .catch((err) => err);

    return res;
  } catch (error) {
    console.log(error);
    return { errors: ["Erro ao buscar os dados do cliente."] };
  }
};

const getAllClients = async () => {
  const config = requestConfig("GET");

  try {
    const res = await fetch(api + "/client/", config)
      .then((res) => res.json())
      .catch((err) => err);

    return res;
  } catch (error) {
    console.log(error);
  }
};

const clientService = {
  insertClient,
  getClientById,
  getAllClients,
};

export default clientService;
