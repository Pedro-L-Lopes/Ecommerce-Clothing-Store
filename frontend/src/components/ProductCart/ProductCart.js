import React from "react";

import { uploads } from "../../utils/config";

const ProductCart = ({ product, removeProductToCart }) => {
  return (
    <div>
      <div className="flex">
        <div className="w-40">
          <img
            src={`${uploads}/products/${product.images[0].filename}`}
            alt={product.name}
          />
        </div>
        <div>
          <p>{product.name}</p>
          <p>{product.onSale ? product.salePrice : product.price}</p>
          <p>{product.size}</p>
        </div>
        <button
          onClick={() => removeProductToCart(product._id)}
          className="bg-red-600"
        >
          Remover
        </button>
      </div>
    </div>
  );
};

export default ProductCart;
