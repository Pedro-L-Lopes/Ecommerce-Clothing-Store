import "./ProductItem.css";

import { motion } from "framer-motion";

import { uploads } from "../utils/config";

import { Link } from "react-router-dom";

const ProductItem = ({ product }) => {
  return (
    <div className="photo-item">
      <div className="Container-product">
        <motion.div className="carousel" whileTap={{ cursor: "grabbing" }}>
          <motion.div className="inner" >
            {product.images &&
              product.images.map((image, index) => (
                <motion.div className="item" drag="x">
                  <img
                    key={index}
                    src={`${uploads}/products/${image.filename}`}
                    alt={product.name}
                  />
                </motion.div>
              ))}
          </motion.div>
        </motion.div>
      </div>
      <h2>{product.name}</h2>
      <h2>{product.price}</h2>
      <h2>{product.description === "undefined" ? "" : product.description}</h2>
      <h2>{product.size}</h2>
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
