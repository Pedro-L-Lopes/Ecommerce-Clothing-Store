import React, { useState } from "react";
import { uploads } from "../../utils/config";

const ProductItem = ({ product, addProductToCart }) => {
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedQuantity, setSelectedQuantity] = useState(1);

  const handleAddToCart = () => {
    const productToAdd = {
      ...product,
      selectedSize: selectedSize,
      quantity: selectedQuantity,
    };
    addProductToCart(productToAdd);
  };

  return (
    <div className="bg-gray-500">
      {/* Renderizar as imagens do produto */}
      {product.images &&
        product.images.map((image, index) => (
          <img
            className="w-48 h-52"
            key={index}
            src={`${uploads}/products/${image.filename}`}
            alt={product.name}
          />
        ))}
      <h2>{product.name}</h2>
      <h2>{product.price}</h2>
      <label>
        Tamanho:
        <select
          value={selectedSize}
          onChange={(e) => setSelectedSize(e.target.value)}
        >
          <option value="">Selecione o tamanho</option>
          <option value="S">S</option>
          <option value="M">M</option>
          <option value="L">L</option>
        </select>
      </label>
      <button
        className="text-white bg-black p-2 rounded"
        onClick={handleAddToCart}
      >
        Adicionar ao carrinho
      </button>
    </div>
  );
};

export default ProductItem;
