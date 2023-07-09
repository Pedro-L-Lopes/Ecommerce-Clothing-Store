import React from "react";
import { uploads } from "../../utils/config";

const ProductCart = ({ product, removeProductFromCart }) => {
  return (
    <div>
      <div className="flex ">
        <div className="flex justify-between w-80 mt-5 m-2 bg-slate-700">
          {product.images && product.images.length > 0 && (
            <img
              className="w-20 h-20"
              src={`${uploads}/products/${product.images[0].filename}`}
              alt={product.name}
            />
          )}
          <div>
            <p>{product.name}</p>
            <p>{product.onSale ? product.salePrice : product.price}</p>
            <p>Selected Size: {product.selectedSize}</p>
            <p>Quantity: {product.quantity}</p>
          </div>
          <button
            onClick={() => removeProductFromCart(product.cartItemId)}
            className="bg-red-600"
          >
            Remover
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCart;
