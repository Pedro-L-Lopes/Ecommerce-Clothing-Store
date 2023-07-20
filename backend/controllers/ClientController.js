const Client = require("../models/Client");

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

module.exports = {
  insertClient,
  getAllClients,
};
