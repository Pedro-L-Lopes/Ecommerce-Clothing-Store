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
    <div className={styles.productBox}>
      {product.images &&
        product.images.map((image, index) => (
          <img
            key={index}
            src={`${uploads}/products/${image.filename}`}
            alt={product.name}
          />
        ))}
      <p className={styles.productPriceBox}>{formatPrice(product.price)}</p>
      <p className="co">{product.name}</p>
    </div>
  );
};

export default ProductItemBox;
