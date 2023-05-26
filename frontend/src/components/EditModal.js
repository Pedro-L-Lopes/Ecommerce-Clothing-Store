import "./EditModal.css";

import { uploads } from "../utils/config";

// Hooks
import { useState } from "react";
import { useDispatch } from "react-redux";

// Redux
import { updateProduct, resetMessage } from "../slices/photoSlice";


const EditModal = ({ product, onClose, onUpdate }) => {
  const [name, setName] = useState(product.name || "");
  const [OId, setOId] = useState(product._id || "");
  const [price, setPrice] = useState(product.price || "");
  const [description, setDescription] = useState();
  const [size, setSize] = useState([]);
  const [onSale, setOnSale] = useState(false);
  const [salePrice, setSalePrice] = useState(0);
  const [available, setAvailable] = useState(true);

  const dispatch = useDispatch();

  const resetComponentMessage = () => {
    setTimeout(() => {
      dispatch(resetMessage());
    }, 2000);
  };

  const handleUpdate = (e) => {
    e.preventDefault();

    const productData = {
      name: name,
      price: price,
      id: OId,
    };

    dispatch(updateProduct(productData));

    resetComponentMessage();

    onUpdate();
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

  // Mudando de disponível para indisponível
  const handleAvailableChange = (e) => {
    setAvailable(e.target.value === "true");
  };

  return (
    <div className="modal">
      <div className="modal-content">

        {/* Formulario de edição */}
        <form onSubmit={handleUpdate}>
          <div className="modal-image">
            {product.images && (
              <img
                src={`${uploads}/products/${product.images[0].filename}`}
                alt={product.name}
              />
            )}
          </div>

          <div className="modal-details">
            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <label>
              <span>Preço:</span>
              <input
                type="number"
                step="0.01"
                onChange={(e) => setPrice(e.target.value)}
                value={price || ""}
              />
            </label>
            <label>
              <span>Tamanhos:</span>
              <label>
                <input
                  type="checkbox"
                  value="PP"
                  checked={size.includes("PP")}
                  onChange={() => handleCheckboxClick("PP")}
                />
                PP
              </label>
              <label>
                <input
                  type="checkbox"
                  value="P"
                  checked={size.includes("P")}
                  onChange={() => handleCheckboxClick("P")}
                />
                P
              </label>
              <label>
                <input
                  type="checkbox"
                  value="M"
                  checked={size.includes("M")}
                  onChange={() => handleCheckboxClick("M")}
                />
                M
              </label>
              <label>
                <input
                  type="checkbox"
                  value="G"
                  checked={size.includes("G")}
                  onChange={() => handleCheckboxClick("G")}
                />
                G
              </label>
              <label>
                <input
                  type="checkbox"
                  value="GG"
                  checked={size.includes("GG")}
                  onChange={() => handleCheckboxClick("GG")}
                />
                GG
              </label>
              <label>
                <input
                  type="checkbox"
                  value="EXG"
                  checked={size.includes("EXG")}
                  onChange={() => handleCheckboxClick("EXG")}
                />
                EXG
              </label>
            </label>
          </div>

          <div className="modal-description">
            <label>
              <span>Descrição:</span>
              <textarea
                id="description"
                name="description"
                rows="4"
                cols="50"
                onChange={(e) => setDescription(e.target.value)}
                value={description || ""}
              ></textarea>
            </label>
          </div>

          <label>
            <span>Em promoção: </span>
            <input
              type="checkbox"
              checked={onSale}
              onChange={(e) => setOnSale(e.target.checked)}
            />
            Em promoção
          </label>

          {/* Verifica se o produto está em promoção e exibe o preço promocional */}
          <div className="modal-promotion">
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
          </div>

          <div className="modal-availability">
            <label>
              <span>Status: </span>
              <input
                type="radio"
                value="true"
                checked={available === true}
                onChange={handleAvailableChange}
              />
              Disponível
            </label>
            <label>
              <input
                type="radio"
                value="false"
                checked={available === false}
                onChange={handleAvailableChange}
              />
              Indisponível
            </label>
          </div>

          <div className="edit-modal-buttons">
            <button type="submit">Atualizar</button>

            <button type="button" onClick={onClose}>
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditModal;
