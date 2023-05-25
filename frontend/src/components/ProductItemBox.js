import "./ProductItemBox.css";

import { uploads } from "../utils/config";

import { Link } from "react-router-dom";

const ProductItemBox = ({ product }) => {
  return (
    <div className="product-box">
      {product.images &&
        product.images.map((image, index) => (
          <img
            key={index}
            src={`${uploads}/products/${image.filename}`}
            alt={product.name}
          />
        ))}
      <p className="product-price-box">R$ {product.price}</p>
      <p className="product-name-box">{product.name}</p>
    </div>
  );
};

export default ProductItemBox;
