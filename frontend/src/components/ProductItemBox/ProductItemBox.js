import styles from "./ProductItemBox.module.css";

import { uploads } from "../../utils/config";

import { Link } from "react-router-dom";

const ProductItemBox = ({ product }) => {
  return (
    <div className={styles.productBox}>
      {product.images &&
        product.images.map((image, index) => (
          <img
            key={index}
            src={`${uploads}/products/${image.filename}`}
            alt={product.name}
          />
        ))}
      <p className={styles.productPriceBox}>R$ {product.price}</p>
      <p className={styles.productNameBox}>{product.name}</p>
    </div>
  );
};

export default ProductItemBox;
