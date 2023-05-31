import styles from "./EditProduct.module.css";

// Uploads
import { uploads } from "../../../utils/config";

// Hooks
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

// Components
import Message from "../../../components/Message/Message";
import SizeCheckbox from "../../../components/SizeCheckbox/SizeCheckbox";

/// Redux
import {
  updateProduct,
  resetMessage,
  getProduct,
} from "../../../slices/productSlice";

const EditProduct = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const { product, loading, error, message } = useSelector(
    (state) => state.product
  );

  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");
  const [selectedSizes, setSelectedSizes] = useState([]);
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
      setSelectedSizes(product.size);
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
      size: selectedSizes,
      onSale: onSale,
      salePrice: salePrice,
      available: available,
    };

    dispatch(updateProduct(updatedProduct));

    resetComponentMessage();
  };

  const handleAvailableChange = (e) => {
    setAvailable(e.target.value);
  };

  if (loading) {
    return <p>Carregando...</p>;
  }

  const sizes = ["PP", "P", "M", "G", "GG", "EXG"];

  const handleCheckboxClick = (size) => {
    setSelectedSizes((prevSelectedSizes) => {
      if (prevSelectedSizes.includes(size)) {
        // Se o tamanho já estiver selecionado, remova-o da lista de selecionados
        return prevSelectedSizes.filter(
          (selectedSize) => selectedSize !== size
        );
      } else {
        // Caso contrário, adicione-o à lista de selecionados
        return [...prevSelectedSizes, size];
      }
    });
  };

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

        <label className="flex items-center mb-2">
          <span className="mr-2">Tamanhos:</span>
          <div className="flex items-center">
            {sizes.map((size, i) => (
              <SizeCheckbox
                key={i}
                size={size}
                checked={selectedSizes.includes(size)}
                onChange={() => handleCheckboxClick(size)}
              />
            ))}
          </div>
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
          <select value={available} onChange={handleAvailableChange}>
            <option value={true}>Disponível</option>
            <option value={false}>Indisponível</option>
          </select>
        </label>

        <label>
          <span>Em promoção:</span>
          <select value={onSale} onChange={(e) => setOnSale(e.target.value)}>
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
