// Components
import Message from "../../../components/Message/Message";
import SizeCheckbox from "../../../components/SizeCheckbox/SizeCheckbox";
import Loading from "../../../components/Loading/Loading";

import {
  allCategories,
  sizes,
} from "../../../components/AnotherComponentsAndFunctions/AnotherComponentsAndFunctions";

import { ReactSortable } from "react-sortablejs";
import { arrayMoveImmutable } from "array-move";

import { useNavigate } from "react-router-dom";

import { BiRightArrowAlt, BiLeftArrowAlt } from "react-icons/bi";
import { BiTrash } from "react-icons/bi";

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
    product,
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
  const [category, setCategory] = useState("");
  const [previewImages, setPreviewImages] = useState([]);

  const navigate = useNavigate();

  const fileInputRef = useRef(null);

  // Limpar os previews quando o componente é desmontado
  useEffect(() => {
    return () => {
      URL.revokeObjectURL(previewImages);
    };
  }, [previewImages]);

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

    if (selectedImages.length === 0) {
      const existingImageUrls = images.map((image) =>
        URL.createObjectURL(image)
      );
      setPreviewImages(existingImageUrls);
    }

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
      category,
    };

    const productFormData = new FormData();
    Object.keys(productData).forEach((key) => {
      if (key === "images") {
        productData.images.forEach((image) => {
          productFormData.append("images", image);
        });
      } else if (key === "size") {
        productData.size.forEach((size) => {
          productFormData.append("size[]", size);
        });
      } else {
        productFormData.append(key, productData[key]);
      }
    });

    await dispatch(publishProduct(productFormData));

    setName("");
    setPrice("");
    setDescription("");
    setSize([]);
    setAvailable(true);
    setOnSale(false);
    setSalePrice("");
    setPreviewImages([]);
    setImages([]);

    resetComponentMessage();
  };

  const handleCheckboxClick = (CheckSize) => {
    if (size.includes(CheckSize)) {
      setSize(size.filter((size) => size !== CheckSize));
    } else {
      setSize([...size, CheckSize]);
    }
  };

  const handleCategory = (e) => {
    if (e.target.value !== "") {
      setCategory(e.target.value);
    }
  };

  const handleImageSortEnd = ({ newIndex, oldIndex }) => {
    const updatedPreviewImages = arrayMoveImmutable(
      previewImages,
      oldIndex,
      newIndex
    );
    const updatedImages = arrayMoveImmutable(images, oldIndex, newIndex);

    setPreviewImages(updatedPreviewImages);
    setImages(updatedImages);
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div>
      {id === userAuth._id && (
        <>
          {images.length > 0 && (
            <div className="flex items-center justify-center">
              <h2 className="text-slate-800 text-center p-2 -mt-10">
                Arraste para ordenar as imagens
              </h2>
            </div>
          )}
          <div className="max-w-full p-6 mx-auto bg-indigo-600 rounded-md dark:bg-gray-800 ml-4">
            <div className="flex justify-center items-center ml-2 border border-slate-800 bg-slate-800 rounded min-w-full h-52 p-2">
              <label className="text-white dark:text-gray-200 absolute">
                <input
                  className="hidden"
                  type="file"
                  accept="image/*"
                  ref={fileInputRef}
                  onChange={handleFile}
                  multiple
                  required
                />
                {images.length === 0 && (
                  <span
                    onClick={(e) => {
                      e.preventDefault();
                      fileInputRef.current.click();
                    }}
                    className="cursor-pointer bg-slate-600 hover:bg-slate-500 rounded-md w-full h-full p-10 shadow-md"
                  >
                    Adicionar fotos
                  </span>
                )}
              </label>
              <BiLeftArrowAlt className="mr-2 fill-slate-400" size="25px" />
              <ReactSortable
                list={previewImages}
                setList={setPreviewImages}
                onEnd={handleImageSortEnd}
                className="flex"
              >
                {previewImages.map((preview, index) => (
                  <div
                    key={index}
                    className="flex-shrink-0 w-52 h-52 relative mr-1"
                  >
                    <img
                      src={preview}
                      alt={`Preview ${index + 1}`}
                      className="w-52 h-52 object-cover object-top rounded-md cursor-move"
                    />
                    <button
                      className="absolute top-0 right-0 text-slate-600 bg-white rounded hover:bg-red-700 hover:text-white transition-all focus:bg-red-700 focus:outline-none"
                      onClick={() => removeImage(index)}
                    >
                      <BiTrash size="26px" />
                    </button>
                  </div>
                ))}
              </ReactSortable>
              <BiRightArrowAlt className="mr-2 fill-slate-400" size="25px" />
            </div>
            <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
              <form onSubmit={submitHandle}>
                <div className="mb-4">
                  <label
                    className="text-white dark:text-gray-200"
                    htmlFor="name"
                  >
                    Nome
                  </label>
                  <input
                    id="name"
                    placeholder="Nome"
                    onChange={(e) => setName(e.target.value)}
                    value={name || ""}
                    required
                    type="text"
                    className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                  />
                </div>

                <div className="mb-4">
                  <label
                    className="text-white dark:text-gray-200"
                    htmlFor="price"
                  >
                    Preço
                  </label>
                  <input
                    id="price"
                    placeholder="Preço"
                    type="number"
                    step="0.01"
                    required
                    onChange={(e) => setPrice(e.target.value)}
                    value={price || ""}
                    className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                  />
                </div>

                <div className="mb-4">
                  <label
                    className="text-white dark:text-gray-200"
                    htmlFor="description"
                  >
                    Descrição
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    placeholder="Descrição"
                    required
                    rows="2"
                    cols="50"
                    onChange={(e) => setDescription(e.target.value)}
                    value={description || ""}
                    className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                  ></textarea>
                </div>

                <div className="flex justify-between">
                  {loadingProduct ? (
                    <Loading />
                  ) : (
                    <button
                      className="px-8 py-2 text-white bg-green-500 rounded-md hover:bg-green-700 focus:bg-green-700 focus:outline-none"
                      type="submit"
                    >
                      Adicionar
                    </button>
                  )}
                </div>
              </form>

              <div className="">
                <div className="mb-4">
                  <span className="text-white dark:text-gray-200">
                    Tamanhos:
                  </span>
                  <div className="mt-2 flex">
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

                <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
                  <div className="mb-4">
                    <span className="text-white dark:text-gray-200">
                      Categoria
                    </span>
                    <select
                      className="block w-full mt-2 p-2 rounded-md bg-slate-200"
                      onChange={handleCategory}
                      required
                    >
                      <option value="">Selecione uma Categoria</option>
                      {allCategories.map((category, index) => {
                        return (
                          <option value={category} key={index}>
                            {category}
                          </option>
                        );
                      })}
                    </select>
                  </div>

                  <div className="mb-4">
                    <span className="text-white dark:text-gray-200">
                      Status:
                    </span>
                    <select
                      className="block w-full mt-2 p-2 rounded-md bg-slate-200"
                      value={available}
                      onChange={(e) => setAvailable(e.target.value === "true")}
                    >
                      <option value={true}>Disponível</option>
                      <option value={false}>Indisponível</option>
                    </select>
                  </div>

                  <div className="mb-4">
                    <span className="text-white dark:text-gray-200">
                      Em promoção:
                    </span>
                    <select
                      className="block w-full mt-2 p-2 rounded-md bg-slate-200"
                      value={onSale}
                      onChange={(e) => setOnSale(e.target.value === "true")}
                    >
                      <option value={true}>Sim</option>
                      <option value={false}>Não</option>
                    </select>
                  </div>

                  {onSale ? (
                    <div className="mb-4">
                      <span className="text-white dark:text-gray-200">
                        Preço promocional
                      </span>
                      <input
                        required
                        placeholder="Preço promocional"
                        type="number"
                        step="0.01"
                        onChange={(e) => setSalePrice(e.target.value)}
                        value={salePrice || ""}
                        className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                      />
                    </div>
                  ) : (
                    <div className="mb-4">
                      <span className="text-white dark:text-gray-200">
                        Preço promocional
                      </span>
                      <input
                        disabled
                        placeholder="Preço promocional"
                        type="number"
                        step="0.01"
                        onChange={(e) => setSalePrice(e.target.value)}
                        value={salePrice || ""}
                        className="cursor-not-allowed block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                      />
                    </div>
                  )}
                </div>
              </div>
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
