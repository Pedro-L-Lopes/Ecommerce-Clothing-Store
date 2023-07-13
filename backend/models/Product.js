const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productSchema = new Schema(
  {
    images: [
      {
        filename: String,
      },
    ],
    name: String,
    price: Number,
    description: String,
    size: [String],
    onSale: Boolean,
    salePrice: Number,
    regularPrice: Number,
    category: String,
    available: Boolean,
    tags: [String],
    userId: mongoose.Types.ObjectId,
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
