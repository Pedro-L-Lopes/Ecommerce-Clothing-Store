import React from "react";

import styles from "./ProductItemBox.module.css";

import { uploads } from "../../utils/config";

import { Link } from "react-router-dom";

const ProductItemBox = ({ product }) => {
  const formatPrice = (price) => {
    return price.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
      minimumFractionDigits: 2,
    });
  };

  return (
    <div className="flex w-40 h-44">
      {product.images &&
        product.images.map((image, index) => (
          <div key={index} className="bg-white rounded-lg shadow-md p-4">
            <img
              src={`${uploads}/products/${image.filename}`}
              alt={product.name}
              className="w-full mb-4 rounded-md"
            />
            <p className="text-lg font-semibold mb-2">
              {formatPrice(product.price)}
            </p>
            <p className="text-base">{product.name}</p>
          </div>
        ))}
    </div>
  );
};

export default React.memo(ProductItemBox);
