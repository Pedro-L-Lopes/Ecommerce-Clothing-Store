import React from "react";

import LazyLoad from "react-lazy-load";

import { uploads } from "../../utils/config";
import { formatPrice } from "../AnotherComponentsAndFunctions/AnotherComponentsAndFunctions";

const ProductItemBox = ({ product }) => {
  const firstImage = product.images ? product.images[0] : null;
  return (
    <div>
      <div className="w-full md:w-52 sm:w-32 lg:w-72 lg:h-80 mt-10 mb-8">
        <div className="h-64">
          {firstImage && (
            <>
              <LazyLoad>
                <img
                  src={`${uploads}/products/${firstImage.filename}`}
                  alt={product.name}
                  className="w-64 h-80 object-cover object-top mx-auto rounded mb-2"
                />
              </LazyLoad>
              <div className="line-clamp-2 ml-4">
                <p className="text-sm ml-2">{product.name}</p>
                {product.onSale ? (
                  <div className="flex items-center">
                    <p className="text-lg font-bold">
                      {formatPrice(product.salePrice)}
                    </p>
                    <p className="text-red-400 text-sm font-bold ml-2 line-through">
                      {formatPrice(product.price)}
                    </p>
                  </div>
                ) : (
                  <p className="text-lg font-bold">
                    {formatPrice(product.price)}
                  </p>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default React.memo(ProductItemBox);
