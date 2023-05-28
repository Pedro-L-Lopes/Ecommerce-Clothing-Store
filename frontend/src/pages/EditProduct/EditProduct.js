import styles from "../EditProduct/EditProduct.module.css";

// Uploads
import { uploads } from "../../utils/config";

// Hooks
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

// Components
import Message from "../../components/Message";

/// Redux
import {
  updateProduct,
  resetMessage,
  getProduct,
} from "../../slices/photoSlice";

const EditProduct = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const { product, loading, error, message } = useSelector(
    (state) => state.product
  );

  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");
  const [size, setSize] = useState([]);
  const [onSale, setOnSale] = useState(false);
  const [salePrice, setSalePrice] = useState(0);
  const [available, setAvailable] = useState();

  const resetComponentMessage = () => {
    setTimeout(() => {
      dispatch(resetMessage());
    }, 2000);
  };

  useEffect(() => {
    dispatch(getProduct(id));
  }, []);

  useEffect(() => {
    if (product && product._id === id) {
      setName(product.name);
      setPrice(product.price);
      setDescription(product.description);
      setSize(product.size);
      setOnSale(product.onSale);
      setSalePrice(product.salePrice);
      setAvailable(product.available);
    }
  }, [product, id]);

  const handleUpdate = (e) => {
    e.preventDefault();

    const updatedProduct = {
      id: id,
      name: name,
      price: price,
      description: description,
      size: size,
      onSale: onSale,
      salePrice: salePrice,
      available: available,
    };

    dispatch(updateProduct(updatedProduct));

    resetComponentMessage();
  };

  // Colocando/retirando tamanhos do array
  const handleCheckboxClick = (value) => {
    setSize((prevSize) => {
      if (prevSize.includes(value)) {
        return prevSize.filter((size) => size !== value);
      } else {
        return [...prevSize, value];
      }
    });
  };

  const handleAvailableChange = (e) => {
    setAvailable(e.target.value);
  };

  if (loading) {
    return <p>Carregando...</p>;
  }

  console.log(available);

  return (
    <div>
      <h1>Editar Produto</h1>

      {error && <p>{error}</p>}

      {product.images && product.images.length > 0 ? (
        <div className={styles.imageContainer}>
          {product.images.map((image, index) => (
            <div className="item" key={index}>
              <img
                src={`${uploads}/products/${image.filename}`}
                alt={product.name}
              />
            </div>
          ))}
        </div>
      ) : (
        <p>Nenhuma imagem disponível</p>
      )}

      <form onSubmit={handleUpdate}>
        <label>
          Nome:
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>
        <br />

        <label>
          Preço:
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </label>

        <label>
          <span>Descrição</span>
          <textarea
            id="description"
            name="description"
            rows="4"
            cols="50"
            onChange={(e) => setDescription(e.target.value)}
            value={description || ""}
          ></textarea>
        </label>

        <label>
          <input
            type="checkbox"
            value="PP"
            checked={size.includes("PP")}
            onChange={() => handleCheckboxClick("PP")}
            className={styles.noneCheck}
          />
          PP
        </label>

        <label>
          <input
            type="checkbox"
            value="P"
            checked={size.includes("P")}
            onChange={() => handleCheckboxClick("P")}
            className={styles.noneCheck}
          />
          P
        </label>

        <label>
          <input
            type="checkbox"
            value="M"
            checked={size.includes("M")}
            onChange={() => handleCheckboxClick("M")}
            className={styles.noneCheck}
          />
          M
        </label>

        <label>
          <input
            type="checkbox"
            value="G"
            checked={size.includes("G")}
            onChange={() => handleCheckboxClick("G")}
            className={styles.noneCheck}
          />
          G
        </label>

        <label>
          <input
            type="checkbox"
            value="GG"
            checked={size.includes("GG")}
            onChange={() => handleCheckboxClick("GG")}
            className={styles.noneCheck}
          />
          GG
        </label>

        <label>
          <input
            type="checkbox"
            value="EXG"
            checked={size.includes("EXG")}
            onChange={() => handleCheckboxClick("EXG")}
            className={styles.noneCheck}
          />
          EXG
        </label>

        <label>
          <select value={available} onChange={handleAvailableChange}>
            <option value={true}>Disponível</option>
            <option value={false}>Indisponível</option>
          </select>
        </label>

        <label>
          <span>Em promoção:</span>
          <select
            value={onSale}
            onChange={(e) => setOnSale(e.target.value === "true")}
          >
            <option value={true}>Sim</option>
            <option value={false}>Não</option>
          </select>
        </label>

        {/* Verifica se o produto está em promoção e exibe o preço promocional */}
        {onSale === true ? (
          <label>
            <span>Preço promocional:</span>
            <input
              type="number"
              step="0.01"
              onChange={(e) => setSalePrice(e.target.value)}
              value={salePrice || ""}
            />
          </label>
        ) : (
          <label>
            <span>Preço promocional:</span>
            <input type="number" disabled />
          </label>
        )}

        <br />

        <button type="submit">Atualizar</button>
      </form>
      {error && <Message msg={error} type="error" />}
      {message && <Message msg={message} type="success" />}
    </div>
  );
};

export default EditProduct;
