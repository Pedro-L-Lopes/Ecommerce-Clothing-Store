// Hooks
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

// Components
import Message from "../../components/Message";

/// Redux
import { updateProduct, resetMessage } from "../../slices/photoSlice";

const EditProduct = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const { product, loading, error, message } = useSelector(
    (state) => state.product
  );

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");

  const resetComponentMessage = () => {
    setTimeout(() => {
      dispatch(resetMessage());
    }, 2000);
  };

  useEffect(() => {
    if (product && product._id === id) {
      setName(product.name);
      setPrice(product.price);
    }
  }, [product, id]);

  const handleUpdate = (e) => {
    e.preventDefault();

    const updatedProduct = {
      id: id,
      name: name,
      price: price,
    };

    dispatch(updateProduct(updatedProduct));

    resetComponentMessage();
  };

  if (loading) {
    return <p>Carregando...</p>;
  }

  return (
    <div>
      <h1>Editar Produto</h1>

      {error && <p>{error}</p>}

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
        <br />

        <button type="submit">Atualizar</button>
      </form>
      {error && <Message msg={error} type="error" />}
      {message && <Message msg={message} type="success" />}
    </div>
  );
};

export default EditProduct;
