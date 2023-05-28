// Requisição http que tem haver com a autenticação do usuário // Register // Login

import { api, requestConfig } from "../utils/config";

// Registrar usuário
const register = async (data) => {
  const config = requestConfig("POST", data); // Executando função criada no utils // Metodo e dados

  try {
    // Espera uma resposta da minha api(url) + url que quero acessar + configurações
    const res = await fetch(api + "/users/register", config)
      .then((res) => res.json()) // Then recebe dados e os transforma em objeto javascript
      .catch((err) => err); // Retorna um erro e cai no catch

    // Se receber uma resposta
    if (res) {
      // Recebe um usuário (id e token)
      // Salvando na localStorage para extrair depois e ver se o usuário está logado // Tranforma em string novamente a resposta
      localStorage.setItem("user", JSON.stringify(res));
    }

    return res;
  } catch (error) {
    console.log(error);
  }
};

// Deslogando
const logout = () => {
  localStorage.removeItem("user");
};

// Logando usuário
const login = async (data) => {
  const config = requestConfig("POST", data);

  try {
    const res = await fetch(api + "/users/login", config)
      .then((res) => res.json())
      .catch((err) => err);

    // Sempre va estar colocando algo na localStorage como user, mesmo os erros, fazer um tratamento mlehor para ver se chegou alguma propriedade do usuário ex: id, aí não colocaria o erro na localStorage
    if (res._id) {
      localStorage.setItem("user", JSON.stringify(res));
    }

    return res;
  } catch (error) {
    console.log(error);
  }
};

const authService = {
  register,
  logout,
  login,
};

export default authService;
