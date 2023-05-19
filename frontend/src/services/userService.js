// Requisição http que tem haver com o usuário

import { api, requestConfig } from "../utils/config";

// Pegando detalhes do usuário baseado no token
const profile = async (data, token) => {
  const config = requestConfig("GET", data, token);

  try {
    const res = await fetch(api + "/users/profile", config)
      .then((res) => res.json())
      .catch((err) => err);

    return res;
  } catch (error) {
    console.log(error);
  }
};

// Atualizando usuário
const updateProfile = async (data, token) => {
  const config = requestConfig("PUT", data, token, true); // true é por que a requisição pode conter imagens

  try {
    const res = await fetch(api + "/users/", config)
      .then((res) => res.json())
      .catch((err) => err);

    return res;
  } catch (error) {
    console.log(error);
  }
};

// Pegando detalhes do usuário // Pegando pelo id ao invês do token como é na função "profile"
const getUserDetails = async (id) => {
  const config = requestConfig("GET");

  try {
    const res = await fetch(api + `/users/${id}`, config)
      .then((res) => res.json())
      .catch((err) => err);

    return res;
  } catch (error) {
    console.log(error);
  }
};

const userService = {
  profile,
  updateProfile,
  getUserDetails,
};

export default userService;
