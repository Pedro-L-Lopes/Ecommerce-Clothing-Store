const mongoose = require("mongoose");
const { Schema } = mongoose;

const orderSchema = new Schema(
  {
    code: Number,
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
    clientName: String,
    total: {
      type: Number,
      required: true,
    },
    deliveryAddress: String,
    shippingType: {
      type: String,
      enum: ["PAC", "SEDEX"],
      default: "PAC",
    },
    shippingCost: String,
    paymentMethod: String,
    status: {
      type: String,
      enum: [
        "Pagamento pendente",
        "Pagamento confirmado",
        "Preparando",
        "A Enviar",
        "Enviado",
        "Entregue",
        "Cancelado",
        "Devolução",
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
