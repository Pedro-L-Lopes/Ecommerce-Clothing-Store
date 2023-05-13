const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productSchema = new Schema(
  {
    images: [String],
    name: String,
    price: Number,
    description: String,
    size: [String],
    onSale: Boolean,
    salePrice: Number,
    regularPrice: Number,
    category: String,
    userId: mongoose.objectId,
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
