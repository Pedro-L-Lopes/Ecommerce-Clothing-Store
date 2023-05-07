require("dotenv").config(); // Arquivo de variaveis de ambiente

const express = require("express");
const path = require("path"); // Usado para determinar onde vai ser o diretorio das imagens
const cors = require("cors"); // Acessar o projeto pelo front-end

const port = process.env.PORT; // Porta que vai rodar a aplicação

const app = express(); // Para inicializar aplicação(invocando o framework)

// Configurando para receber em json (texto, como se fosse um onjeto js) e form data (enviar imagens)
app.use(express.json()); // Habilitar json
app.use(express.urlencoded({ extended: false })); // Aceitar form data // Configurar quando for trabalhar com as reqs, por enquanto deixa desconfigurado

// Importando middlewares
// Resolver Cors (requisições de um mesmo dominio)
app.use(cors({ credentials: true, origin: "htpp://localhost:3000" })); // Mudar quando mudar a origen da requisição

// Diretorio de upload de imagens
app.use("/uploads", express.static(path.join(__dirname, "/uploads")));
        //A pasta vai conter aquivos estaticos  // Juntando o diretorio atual + /uploads para salvar as pastas

// Conexão com banco de dados
require("./config/db.js")

// Rotas
const router = require("./routes/Router.js"); // Arquivo com redirecionamento para todas as rotas

app.use(router);

app.listen(port, () => {
  console.log(`App rodando na porta: ${port}`);
});
