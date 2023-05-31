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

  const sizes = ["PP", "P", "M", "G", "GG", "EXG"];

  console.log(size)

  return (
    <div id="profile">
      {/* Verifica a loja e exibe o formulário de cadastro de produtos */}
      {id === userAuth._id && (
        <>
          <div className="new-photo" ref={newProductForm}>
            <h3 className="text-xl font-bold">Adicionando produto</h3>
            <div className="preview-container">
              {previewImages.length === 0 && (
                <p className="cursor-pointer hover:opacity-75 transition-opacity">
                  Clique para adicionar imagens
                </p>
              )}
              {previewImages.map((preview, index) => (
                <div key={index} className="image-preview">
                  <img src={preview} alt={`Preview ${index + 1}`} />
                  <button
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                    onClick={() => removeImage(index)}
                  >
                    Remover
                  </button>
                </div>
              ))}
            </div>
            <form onSubmit={submitHandle}>
              <label className="flex items-center mb-2">
                <span className="mr-2">Nome:</span>
                <input
                  className="border border-gray-300 rounded py-1 px-2"
                  type="text"
                  placeholder="Nome"
                  onChange={(e) => setName(e.target.value)}
                  value={name || ""}
                  required
                />
              </label>

              <label className="flex items-center mb-2">
                <span className="mr-2">Fotos:</span>
                <input
                  className="hidden"
                  type="file"
                  accept="image/*"
                  ref={fileInputRef}
                  onChange={handleFile}
                  multiple
                />
                <span
                  className="border border-gray-300 rounded py-1 px-2 cursor-pointer hover:bg-gray-100"
                  onClick={() => fileInputRef.current.click()}
                >
                  Selecione as fotos
                </span>
              </label>

              <label className="flex items-center mb-2">
                <span className="mr-2">Preço:</span>
                <input
                  className="border border-gray-300 rounded py-1 px-2"
                  type="number"
                  step="0.01"
                  onChange={(e) => setPrice(e.target.value)}
                  value={price || ""}
                />
              </label>

              <label className="flex items-center mb-2">
                <span className="mr-2">Descrição:</span>
                <textarea
                  className="border border-gray-300 rounded py-1 px-2 resize-none"
                  id="description"
                  name="description"
                  rows="4"
                  cols="50"
                  onChange={(e) => setDescription(e.target.value)}
                  value={description || ""}
                ></textarea>
              </label>

              <label className="flex items-center mb-2">
                <span className="mr-2">Tamanhos:</span>
                <div className="flex items-center">
                  <label className="flex items-center mr-2">
                    {sizes?.map((size, i) => (
                      <input 
                      key={i}
                        type="checkbox"
                        value={size[i]}
                        checked={size.includes(size[i])}
                        onChange={() => handleCheckboxClick(size[i])}
                        className="form-checkbox mr-1"
                      />
                      
                    ))}
                    <span
                      className={`rounded-full h-6 w-6 flex items-center justify-center border border-gray-300 ${
                        size.includes("PP")
                          ? "bg-blue-500 text-white"
                          : "text-gray-400"
                      } cursor-pointer hover:opacity-75 transition-opacity`}
                    >
                      PP
                    </span>

                  </label>
                </div>
              </label>

              <label className="flex items-center mb-2">
                <span className="mr-2">Status: </span>
                <select
                  className="border border-gray-300 rounded py-1 px-2"
                  value={available}
                  onChange={handleAvailableChange}
                >
                  <option value={true}>Disponível</option>
                  <option value={false}>Indisponível</option>
                </select>
              </label>

              <label className="flex items-center mb-2">
                <span className="mr-2">Em promoção:</span>
                <select
                  className="border border-gray-300 rounded py-1 px-2"
                  value={onSale}
                  onChange={(e) => setOnSale(e.target.value === "true")}
                >
                  <option value={true}>Sim</option>
                  <option value={false}>Não</option>
                </select>
              </label>

              {/* Verifica se o produto está em promoção e exibe o preço promocional */}
              {onSale === true ? (
                <label className="flex items-center mb-2">
                  <span className="mr-2">Preço promocional:</span>
                  <input
                    className="border border-gray-300 rounded py-1 px-2"
                    type="number"
                    step="0.01"
                    onChange={(e) => setSalePrice(e.target.value)}
                    value={salePrice || ""}
                  />
                </label>
              ) : (
                <label className="flex items-center mb-2">
                  <span className="mr-2">Preço promocional:</span>
                  <input
                    className="border border-gray-300 rounded py-1 px-2"
                    type="number"
                    disabled
                  />
                </label>
              )}

              {!loadingProduct && (
                <input
                  className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded cursor-pointer"
                  type="submit"
                  value="Adicionar"
                />
              )}
              {loadingProduct && (
                <input
                  className="bg-gray-300 text-gray-600 font-bold py-2 px-4 rounded cursor-not-allowed"
                  type="submit"
                  value="Aguarde..."
                  disabled
                />
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
