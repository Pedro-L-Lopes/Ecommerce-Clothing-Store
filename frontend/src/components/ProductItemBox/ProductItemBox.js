import React from "react";

// Components
import { uploads } from "../../utils/config";
import { Link } from "react-router-dom";
import { formatPrice } from "../AnotherComponentsAndFunctions/AnotherComponentsAndFunctions";

const ProductItemBox = ({ product }) => {
  const firstImage = product.images ? product.images[0] : null;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      <div className="w-full md:w-52 p-2 m-2">
        <div className="h-64">
          {firstImage && (
            <>
              <img
                src={`${uploads}/products/${firstImage.filename}`}
                alt={product.name}
                className="w-full h-56 object-cover object-top mx-auto rounded mb-2"
              />
              <div className="line-clamp-2">
                <p className="text-lg font-bold">
                  {formatPrice(product.price)}
                </p>
                <p className="text-sm">{product.name}</p>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default React.memo(ProductItemBox);
