import "./ProductItem.css";

import { uploads } from "../../utils/config";

import { Link } from "react-router-dom";

import { useEffect, useRef, useState } from "react";

const ProductItem = ({ product, addProductToCart }) => {
  return (
    <div id="product-item">
      <div className="Container-product">
        <div>
          <div className="inner">
            {product.images &&
              product.images.map((image, index) => (
                <div className="item">
                  <img
                    key={index}
                    src={`${uploads}/products/${image.filename}`}
                    alt={product.name}
                  />
                </div>
              ))}
          </div>
        </div>
      </div>
      <h2>{product.name}</h2>
      <h2>{product.price}</h2>
      <h2>{product.description === "undefined" ? "" : product.description}</h2>
      <h2>{product.size}</h2>
      <h2>{product.category}</h2>
      <button
        className="text-white bg-black p-2 rounded"
        onClick={() => addProductToCart(product)}
      >
        Adicionar ao carrinho
      </button>
    </div>
  );
};

export default ProductItem;

// {product.images &&
//   product.images.map((image, index) => (
//     <img
//       key={index}
//       src={`${uploads}/products/${image.filename}`}
//       alt={product.name}
//     />
//   ))}
