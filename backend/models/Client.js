const mongoose = require("mongoose");
const { Schema } = mongoose;

const clientSchema = new Schema(
  {
    code: {
      type: Number,
      required: true,
    },
    name: String,
    email: String,
    street: String,
    neighborhood: String,
    houseNumber: String,
    city: String,
    cep: String,
    phoneNumber: String,
    nasc: String,
    gender: String,
    status: String,
    uf: String,
  },
  {
    timestamps: true,
  }
);

const Client = mongoose.model("Client", clientSchema);

module.exports = Client;
