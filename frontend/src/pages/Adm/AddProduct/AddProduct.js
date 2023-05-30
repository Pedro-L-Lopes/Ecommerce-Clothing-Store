import "../Profile/Profile.css";

import { uploads } from "../../../utils/config";

// Components
import Message from "../../../components/Message/Message";

// Hooks
import { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

// Redux
import { getUserDetails } from "../../../slices/userSlice";
import {
  publishProduct,
  resetMessage,
  getUserProducts,
} from "../../../slices/productSlice";

const AddProduct = () => {
  const { id } = useParams();

  const dispatch = useDispatch();

  const { user, loading } = useSelector((state) => state.user);
  // Usuário autenticado // Renomenado pois colidem
  const { user: userAuth } = useSelector((state) => state.auth);

  const {
    products,
    loading: loadingProduct,
    message: messageProduct,
    error: errorProduct,
  } = useSelector((state) => state.product);

  const [name, setName] = useState("");
  const [images, setImages] = useState([]);
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState();
  const [size, setSize] = useState([]);
  const [onSale, setOnSale] = useState(false);
  const [salePrice, setSalePrice] = useState(0);
  const [available, setAvailable] = useState(true);

  const [previewImages, setPreviewImages] = useState([]);
  const fileInputRef = useRef(null);

  // Limpar os previews qunado o componente é desmontado
  useEffect(() => {
    return () => {
      URL.revokeObjectURL(previewImages);
    };
  }, [previewImages]);

  // Novo formulario e editar a nivel de dom
  const newProductForm = useRef();

  // Carregando usuário // Por causa desse tem o preenchimento do user acima
  useEffect(() => {
    dispatch(getUserDetails(id));
    dispatch(getUserProducts(id));
  }, [dispatch, id]);

  const handleFile = (e) => {
    const selectedImages = Array.from(e.target.files);
    if (selectedImages.length > 3) {
      alert("Adicione no maxímo três fotos!");
      return;
    }
    const previewImageUrls = selectedImages.map((file) =>
      URL.createObjectURL(file)
    );
    setPreviewImages(previewImageUrls);
    setImages(selectedImages);
  };

  const removeImage = (index) => {
    const updatedPreviewImages = [...previewImages];
    updatedPreviewImages.splice(index, 1);
    setPreviewImages(updatedPreviewImages);

    const updatedImages = [...images];
    updatedImages.splice(index, 1);
    setImages(updatedImages);
  };

  const removeAllImages = () => {
    setPreviewImages([]);
    setImages([]);
  };

  const handleFileInputClick = () => {
    fileInputRef.current.click();
  };

  const resetComponentMessage = () => {
    setTimeout(() => {
      dispatch(resetMessage());
    }, 2000);
  };

  const submitHandle = async (e) => {
    e.preventDefault();

    const productData = {
      name,
      images,
      price,
      description,
      size,
      onSale,
      salePrice,
      available,
    };

    // Construindo form data
    const productFormData = new FormData();
    Object.keys(productData).forEach((key) => {
      if (key === "images") {
        productData.images.forEach((image) => {
          productFormData.append("images", image);
        });
      } else {
        productFormData.append(key, productData[key]);
      }
    });

    await dispatch(publishProduct(productFormData));

    // setName("");
    // setImages("");
    // setDescription("");
    // setSize("");
    // setOnSale("");
    // setSalePrice("");

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
    setAvailable(e.target.value === "true");
  };

  if (loading) {
    return <p>Carregando...</p>;
  }

  return (
    <div id="profile">
      {/* Verifica a loja e exibe o formulario de cadastro de produtos */}
      {id === userAuth._id && (
        <>
          <div className="new-photo" ref={newProductForm}>
            <h3>Adicionando produto</h3>
            <div className="preview-container">
              {previewImages.length === 0 && (
                <p>Clique para adicionar imagens</p>
              )}
              {previewImages.map((preview, index) => (
                <div key={index} className="image-preview">
                  <img src={preview} alt={`Preview ${index + 1}`} />
                  <button onClick={() => removeImage(index)}>Remover</button>
                </div>
              ))}
            </div>
            <form onSubmit={submitHandle}>
              <label>
                <span>Nome:</span>
                <input
                  type="text"
                  placeholder="Nome"
                  onChange={(e) => setName(e.target.value)}
                  value={name || ""}
                  required
                />
              </label>

              <label>
                <span>Fotos:</span>
                <input
                  type="file"
                  accept="image/*"
                  ref={fileInputRef}
                  onChange={handleFile}
                  multiple
                  // style={{ display: "none" }}
                />
              </label>

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

              <label>
                <span>Status: </span>
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

              {!loadingProduct && <input type="submit" value="Adicionar" />}
              {loadingProduct && (
                <input type="submit" value="Aguarde..." disabled />
              )}
            </form>
          </div>
          {errorProduct && <Message msg={errorProduct} type="error" />}
          {messageProduct && <Message msg={messageProduct} type="success" />}
        </>
      )}
    </div>
  );
};

export default AddProduct;
