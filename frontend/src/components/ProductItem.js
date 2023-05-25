import "./ProductItem.css";

import { uploads } from "../utils/config";

import { Link } from "react-router-dom";

const ProductItem = ({ product }) => {
  return (
    <div className="photo-item">
      {product.images &&
        product.images.map((image, index) => (
          <img
            key={index}
            src={`${uploads}/products/${image.filename}`}
            alt={product.name}
          />
        ))}
      <h2>{product.name}</h2>
      <h2>{product.price}</h2>
      <h2>{product.description === "undefined" ? "" : product.description}</h2>
      <h2>{product.size}</h2>
    </div>
  );
};

export default ProductItem;
