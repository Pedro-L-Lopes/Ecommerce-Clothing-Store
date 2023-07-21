const mongoose = require("mongoose");
const { Schema } = mongoose;

const orderSchema = new Schema(
  {
    products: [
      {
        productId: {
          type: Schema.Types.ObjectId,
          required: true,
          ref: "Product",
        },
        name: String,
        quantity: {
          type: Number,
          required: true,
        },
        size: String,
        value: {
          type: Number,
          required: true,
        },
        code: Number,
      },
    ],
    client: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Client",
    },
    total: {
      type: Number,
      required: true,
    },
    deliveryAddress: String, // Endereço de entrega
    shippingType: {
      type: String,
      enum: ["PAC", "SEDEX"],
      default: "PAC",
    },
    shippingCost: Number, // Custo do envio
    paymentMethod: String, // Forma de pagamento
    status: {
      type: String,
      enum: [
        "Pagamento pendente",
        "A Enviar",
        "Enviado",
        "Entregue",
        "Cancelado",
      ],
      default: "Pagamento pendente",
    },
    observation: String,
    clientObservation: String,
  },
  {
    timestamps: true,
  }
);

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
