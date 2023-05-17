// Responsavel para configurar as requsições http para não precisar configurar a cada req

export const api = "http://localhost:5000/api";
export const uploads = "http://localhost:5000/uploads";

// Configurando a requisição // Metodo // Dados // Toke do usuário // Imagens enviadas tmb serão configuradas por aqui
export const requestConfig = (method, data, token = null, image = null) => {
  let config;

  if (image) {
    // Se vier imagem // Form data
    config = {
      // Objeto contendo
      method, // Metodo que sera enviado pelo argumento
      body: data, // Os dados que vem do argumento data
      headers: {}, // Tem que existir mas estarão vazios para não dar erro
    };
  } else if (method === "DELETE" || data === null) {
    // Funções que não vão ter dados mas precisa ter o retorno de algo // Não tem cabeçalho pois não tem dados para mandar, só precisa definir o metodo que lá no server a função já vai se resolver sozinha
    config = {
      method,
      headers,
    };
  } else {
    // Ultimo caso, quando vem dados
    config = {
      method, // Que vem na requisição
      body: JSON.stringify(data), // Utiliza json
      headers: {
        // Como é json preicsa mudar o metodo
        "Content-Type": "application/json",
      },
    };
  }

  // Verifcando se veio o token e coloca no headers
  if (token) {
    config.headers.Authorization = `Bearer ${token}`; // Utilizando o Authorization que fez a validação la no back
  }

  return config;
};
