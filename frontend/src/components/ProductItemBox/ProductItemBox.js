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

  const firstImage = product.images ? product.images[0] : null;

  return (
    <div className="w-44 p-2 m-2">
      {firstImage && (
        <div className="h-60 grid grid-cols-5">
          <img
            src={`${uploads}/products/${firstImage.filename}`}
            alt={product.name}
            className="w-44 h-56 flex items-center justify-center object-cover object-top mx-auto mb-2 col-span-5"
          />
          <div className="col-start-1 col-end-6">
            <p className="text-lg font-bold">{formatPrice(product.price)}</p>
            <p className="text-sm">{product.name}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default React.memo(ProductItemBox);
