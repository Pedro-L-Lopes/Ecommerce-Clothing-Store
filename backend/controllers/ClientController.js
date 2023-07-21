const Client = require("../models/Client");
const mongoose = require("mongoose");

const insertClient = async (req, res) => {
  const {
    name,
    email,
    street,
    neighborhood,
    houseNumber,
    city,
    cep,
    phoneNumber,
    nasc,
    gender,
    status,
    uf,
  } = req.body;

  try {
    // Verificar se o cliente já existe no banco de dados
    let existingClient = await Client.findOne({ email });

    if (existingClient) {
      // Atualizar os dados do cliente existente
      existingClient.name = name;
      existingClient.street = street;
      existingClient.neighborhood = neighborhood;
      existingClient.houseNumber = houseNumber;
      existingClient.city = city;
      existingClient.cep = cep;
      existingClient.phoneNumber = phoneNumber;
      existingClient.nasc = nasc;
      existingClient.gender = gender;
      existingClient.status = status;
      existingClient.uf = uf;

      await existingClient.save();

      return res.status(200).json({ clientId: existingClient._id });
    } else {
      // Criar um novo cliente
      const lastClient = await Client.findOne({}).sort({ code: -1 }).exec();
      let nextCode = 1;

      if (lastClient && !isNaN(lastClient.code)) {
        nextCode = parseInt(lastClient.code) + 1;
      }

      const newClient = await Client.create({
        code: nextCode,
        name,
        email,
        street,
        neighborhood,
        houseNumber,
        city,
        cep,
        phoneNumber,
        nasc,
        gender,
        status,
        uf,
      });

      return res.status(201).json({ clientId: newClient._id });
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      error:
        "Houve um erro ao criar/atualizar o cliente. Por favor, tente novamente mais tarde.",
    });
  }
};

const getAllClients = async (req, res) => {
  const client = await Client.find({})
    .sort([["createdAt", -1]])
    .exec();

  return res.status(200).json(client);
};

// Pegando usuário pelo Id
const getClientById = async (req, res) => {
  const { id } = req.params; // Pegando id da url pois é um GET

  try {
    // Tenta achar o cliente
    const client = await Client.findById(new mongoose.Types.ObjectId(id));

    // Checando se o cliente existe
    if (!client) {
      // Retornar uma resposta com erro caso o cliente não seja encontrado
      return res.status(404).json({ errors: ["Cliente não encontrado"] });
    }

    // Retornar os dados do cliente encontrados
    res.status(200).json(client);
  } catch (error) {
    // Lidar com qualquer outro erro
    res.status(500).json({ errors: ["Erro ao buscar os dados do cliente."] });
  }
};

module.exports = {
  insertClient,
  getAllClients,
  getClientById,
};
