import "../Profile/Profile.css";

import { uploads } from "../../../utils/config";

// Components
import Message from "../../../components/Message/Message";
import SizeCheckbox from "../../../components/SizeCheckbox/SizeCheckbox";

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
  const [onSale, setOnSale] = useState(false);
  const [salePrice, setSalePrice] = useState(0);
  const [available, setAvailable] = useState(true);
  const [size, setSize] = useState([]);

  const [previewImages, setPreviewImages] = useState([]);
  const fileInputRef = useRef(null);

  // Limpar os previews quando o componente é desmontado
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

  const clearForm = () => {
    setName("");
    setPrice("");
    setDescription("");
    setSize([]);
    setAvailable(true);
    setOnSale(false);
    setSalePrice("");
    setPreviewImages([]);
    setImages([]);
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

    clearForm();

    resetComponentMessage();
  };

  const handleAvailableChange = (e) => {
    setAvailable(e.target.value === "true");
  };

  if (loading) {
    return <p>Carregando...</p>;
  }

  const sizes = ["PP", "P", "M", "G", "GG", "EXG"];

  const handleCheckboxClick = (CheckSize) => {
    if (size.includes(CheckSize)) {
      setSize(size.filter((size) => size !== CheckSize));
    } else {
      setSize([...size, CheckSize]);
    }
  };

  return (
    <div>
      {/* Verifica a loja e exibe o formulário de cadastro de produtos */}
      {id === userAuth._id && (
        <>
          <div className=" ">
            <div className="">
              <form onSubmit={submitHandle}>
                <label>
                  <input
                    type="text"
                    placeholder="Nome"
                    onChange={(e) => setName(e.target.value)}
                    value={name || ""}
                    required
                  />
                </label>

                <label>
                  <input
                    placeholder="Preço"
                    className=""
                    type="number"
                    step="0.01"
                    onChange={(e) => setPrice(e.target.value)}
                    value={price || ""}
                  />
                </label>

                <label className="">
                  <textarea
                    placeholder="Descrição"
                    className=""
                    id="description"
                    name="description"
                    rows="4"
                    cols="50"
                    onChange={(e) => setDescription(e.target.value)}
                    value={description || ""}
                  ></textarea>
                </label>
                <div>
                  <button
                    className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded cursor-pointer"
                    type="submit"
                  >
                    Adicionar
                  </button>
                  {loadingProduct && (
                    <button
                      className="bg-gray-300 text-gray-600 font-bold py-2 px-4 rounded cursor-not-allowed"
                      disabled
                    >
                      Aguarde...
                    </button>
                  )}
                </div>
              </form>
            </div>

            <div className="">
              <div>
                <span className="">Tamanhos:</span>
                <div className="">
                  {sizes.map((AllSizes, i) => (
                    <SizeCheckbox
                      key={i}
                      size={AllSizes}
                      checked={size.includes(AllSizes)}
                      onChange={() => handleCheckboxClick(AllSizes)}
                    />
                  ))}
                </div>
              </div>

              <div className="">
                <span className="">Categoria</span>
                <select className="">
                  <option>T-shirt</option>
                  <option>Cropped</option>
                </select>
              </div>

              <div className="">
                <span className="">Status: </span>
                <select
                  className=""
                  value={available}
                  onChange={handleAvailableChange}
                >
                  <option value={true}>Disponível</option>
                  <option value={false}>Indisponível</option>
                </select>
              </div>

              <div className="">
                <span className="">Em promoção:</span>
                <select
                  className=""
                  value={onSale}
                  onChange={(e) => setOnSale(e.target.value === "true")}
                >
                  <option value={true}>Sim</option>
                  <option value={false}>Não</option>
                </select>
              </div>

              {onSale === true ? (
                <div className="">
                  <input
                    placeholder="Preço promocional"
                    className=""
                    type="number"
                    step="0.01"
                    onChange={(e) => setSalePrice(e.target.value)}
                    value={salePrice || ""}
                  />
                </div>
              ) : (
                <div className="">
                  <input
                    placeholder="Preço promocional"
                    className="border border-gray-300 rounded py-1 px-2"
                    type="number"
                    disabled
                  />
                </div>
              )}
            </div>

            <div className="">
              <label>
                <span className="">Fotos:</span>
                <input
                  className="hidden"
                  type="file"
                  accept="image/*"
                  ref={fileInputRef}
                  onChange={handleFile}
                  multiple
                  required
                />
                <span
                  className=""
                  onClick={() => fileInputRef.current.click()}
                >
                  Adicione fotos
                </span>
              </label>
              {previewImages.map((preview, index) => (
                <div key={index}>
                  <img
                    src={preview}
                    alt={`Preview ${index + 1}`}
                    className=""
                  />
                  <button
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                    onClick={() => removeImage(index)}
                  >
                    Remover
                  </button>
                </div>
              ))}
            </div>
          </div>
          {errorProduct && <Message msg={errorProduct} type="error" />}
          {messageProduct && <Message msg={messageProduct} type="success" />}
        </>
      )}
    </div>
  );
};

export default AddProduct;
