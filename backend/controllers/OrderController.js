const Order = require("../models/Order");
const Client = require("../models/Client");
const Product = require("../models/Product");

const mongoose = require("mongoose");

const createOrder = async (req, res) => {
  const {
    clientId,
    products,
    clientName,
    deliveryAddress,
    shippingType,
    shippingCost,
    paymentMethod,
    status,
    clientObservation,
    code,
  } = req.body;

  try {
    const client = await Client.findById(clientId);
    if (!client) {
      return res.status(404).json({ error: "Cliente não encontrado." });
    }

    let total = 0;
    const orderProducts = [];

    for (const productData of products) {
      const product = await Product.findById(productData.productId);

      if (!product) {
        return res.status(404).json({
          error: `Produto com ID ${productData.productId} não encontrado.`,
        });
      }

      orderProducts.push({
        productId: product._id,
        name: product.name,
        quantity: productData.quantity,
        size: productData.size,
        value: product.price,
        code: product.code,
      });

      total += product.price * productData.quantity;
    }

    const lastProduct = await Product.findOne({}).sort({ code: -1 }).exec();
    let nextCode = 1;

    if (lastProduct && !isNaN(lastProduct.code)) {
      nextCode = parseInt(lastProduct.code) + 1;
    }

    // Criar o pedido no banco de dados
    const order = new Order({
      products: orderProducts,
      client: client._id,
      clientName,
      total: total,
      deliveryAddress,
      shippingType,
      shippingCost,
      paymentMethod,
      status,
      clientObservation,
      code: nextCode,
    });

    await order.save();

    return res.status(201).json({ orderId: order._id });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      error:
        "Houve um erro ao criar o pedido. Por favor, tente novamente mais tarde.",
    });
  }
};

const getAllOrders = async (req, res) => {
  const orders = await Order.find({})
    .sort([["createdAt", -1]])
    .exec();

  return res.status(200).json(orders);
};

const getClientOrders = async (req, res) => {
  const { id } = req.params;

  const orders = await Order.find({ client: id })
    .sort([["createdAt", -1]])
    .exec();

  return res.status(200).json(orders);
};

const getOrderById = async (req, res) => {
  const { id } = req.params;

  const order = await Order.findById(new mongoose.Types.ObjectId(id));

  if (!order) {
    res.status(404).json({ errors: ["Pedido não encontrado!"] });
    return;
  }

  res.status(200).json(order);
};

const updateOrder = async (req, res) => {
  const { id } = req.params;

  const { status, observation } = req.body;

  const order = await Order.findById(id);

  if (!order) {
    res.status(404).json({ errors: ["Produto não encontrado."] });
    return;
  }

  if (status) {
    order.status = status;
  }

  if (observation) {
    order.observation = observation;
  }

  await order.save();

  res.status(200).json({ order, message: "Pedido atualizado com sucesso." });
};

module.exports = {
  createOrder,
  getAllOrders,
  getClientOrders,
  getOrderById,
  updateOrder,
};
