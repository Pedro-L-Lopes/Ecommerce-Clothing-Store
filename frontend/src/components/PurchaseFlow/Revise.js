import React from "react";
import { uploads } from "../../utils/config";

import { formatPrice } from "../AnotherComponentsAndFunctions/AnotherComponentsAndFunctions";
import { AiOutlineMinusSquare, AiOutlinePlusSquare } from "react-icons/ai";
import { Link } from "react-router-dom";

const Revise = ({ product }) => {
  return (
    <div>
      <div className="flex items-center justify-center mt-5 m-2">
        <div className="flex items-center">
          <div className="mr-4">
            {product.images && product.images.length > 0 && (
              <img
                className="w-28 h-28"
                src={`${uploads}/products/${product.images[0].filename}`}
                alt={product.name}
              />
            )}
          </div>
          <div className="w-96">
            <Link to={`/products/${product._id}`}>
              <p className="font-bold underline">{product.name}</p>
            </Link>
            <p>Tamanho {product.selectedSize}</p>
            <p>Quantidade: {product.quantity}</p>
          </div>
        </div>
        <div className="text-center w-36 ml-2">
          <p className="font-bold">
            {product.onSale
              ? formatPrice(product.salePrice * product.quantity)
              : formatPrice(product.price * product.quantity)}
          </p>
          {product.quantity > 1 ? (
            <p className="">
              ({formatPrice(product.onSale ? product.salePrice : product.price)}
              <span className="ml-1">Cada</span>)
            </p>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
};

export default Revise;
