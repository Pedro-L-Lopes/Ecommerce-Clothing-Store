import { api, requestConfig } from "../utils/config";

const insertClient = async (data) => {
  const config = requestConfig("POST", data);

  try {
    const res = await fetch(api + "/client/", config)
      .then((res) => res.json())
      .catch((err) => err);

    if (res) {
      // Recebe um usuário (id e token)
      // Salvando na localStorage para extrair depois e ver se o usuário está logado // Tranforma em string novamente a resposta
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

const clientService = {
  insertClient,
  getClientById,
};

export default clientService;
