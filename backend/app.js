const express = require("express");
const path = require("path"); // Usado para determinar onde vai ser o diretorio das imagens
const cors = require("cors"); // Acessar o projeto pelo front-end

const port = 5000; // Porta que vai rodar

const app = express(); // Para inicializar aplicação(invocando o framework)

// Configurando para receber em json (texto, como se fosse um onjeto js) e form data (enviar imagens)
app.use(express.json()); // Habilitar json
app.use(express.urlencoded({ extended: false })); // Aceitar form data // Configurar quando for trabalhar com as reqs, por enquanto deixa desconfigurado

app.listen(port, () => {
  console.log(`App rodando na porta: ${port}`);
});
