const Order = require("../models/Order");
const Client = require("../models/Client");
const Product = require("../models/Product");

const createOrder = async (req, res) => {
  const {
    clientId,
    products,
    deliveryAddress,
    shippingType,
    shippingCost,
    paymentMethod,
    status,
  } = req.body;

  try {
    // Verificar se o cliente existe no banco de dados
    const client = await Client.findById(clientId);
    if (!client) {
      return res.status(404).json({ error: "Cliente não encontrado." });
    }

    // Verificar se os produtos existem no banco de dados e calcular o total do pedido
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

    // Criar o pedido no banco de dados
    const order = new Order({
      products: orderProducts,
      client: client._id,
      total: total,
      deliveryAddress,
      shippingType,
      shippingCost,
      paymentMethod,
      status,
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

module.exports = {
  createOrder,
  getAllOrders,
  getClientOrders,
};
