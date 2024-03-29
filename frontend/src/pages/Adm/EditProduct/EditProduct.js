// Uploads
import { uploads } from "../../../utils/config";

// Hooks
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

// Components
import Message from "../../../components/Message/Message";
import SizeCheckbox from "../../../components/SizeCheckbox/SizeCheckbox";
import {
  allCategories,
  sizes,
} from "../../../components/AnotherComponentsAndFunctions/AnotherComponentsAndFunctions";
import Loading from "../../../components/Loading/Loading";

// Redux
import {
  updateProduct,
  resetMessage,
  getProduct,
} from "../../../slices/productSlice";
import Sidebar from "../../../components/Sidebar/Sidebar";

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
  const [category, setCategory] = useState(product.category);
  const [tags, setTags] = useState("");

  const resetComponentMessage = () => {
    setTimeout(() => {
      dispatch(resetMessage());
    }, 2000);
  };

  useEffect(() => {
    dispatch(getProduct(id));
    if (product && Array.isArray(product.tags)) {
      setTags(product.tags.join(","));
    }
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
      setCategory(product.category);
      setTags(product.tags);
    }
  }, [product, id]);

  console.log(size);

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
      category: category,
      tags: typeof tags === "string" ? tags.split(",") : [],
    };

    dispatch(updateProduct(updatedProduct));

    resetComponentMessage();
  };

  const handleCheckboxClick = (checkedSize) => {
    const updatedSize = [...size];

    if (updatedSize.includes(checkedSize)) {
      updatedSize.splice(updatedSize.indexOf(checkedSize), 1);
    } else {
      updatedSize.push(checkedSize);
    }

    setSize(updatedSize);
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="bg-slate-800 h-screen">
      <Sidebar />
      <div className="max-w-full ml-12 p-6 mx-auto bg-indigo-600 rounded-md dark:bg-gray-800">
        <div className="flex justify-center items-center ml-2 bg-gray-800 rounded-t min-w-full h-52 p-2">
          {product.images &&
            product.images.map((image, index) => (
              <div
                key={index}
                className="flex-shrink-0 w-52 h-52 relative mr-1"
              >
                <img
                  src={`${uploads}/products/${image.filename}`}
                  alt={product.name}
                  className="w-52 h-52 object-cover object-top rounded-md"
                />
              </div>
            ))}
        </div>
        <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
          <form onSubmit={handleUpdate}>
            <div className="mb-4">
              <label className="text-white dark:text-gray-200" htmlFor="name">
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
              <label className="text-white dark:text-gray-200" htmlFor="price">
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
              {loading ? (
                <Loading />
              ) : (
                <button
                  className="px-8 py-2 text-white bg-green-500 rounded-md hover:bg-green-700 focus:bg-green-700 focus:outline-none"
                  type="submit"
                >
                  Atualizar
                </button>
              )}
            </div>
          </form>

          <div className="">
            <div className="mb-4">
              <span className="text-white dark:text-gray-200">Tamanhos:</span>
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
                <span className="text-white dark:text-gray-200">Categoria</span>
                <select
                  className="block w-full mt-2 p-2 rounded-md bg-slate-200"
                  onChange={(e) => setCategory(e.target.value)}
                  required
                >
                  <option value="">
                    {product.category ? category : "Selecione uma categoria"}
                  </option>
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
                <span className="text-white dark:text-gray-200">Status:</span>
                <select
                  className="block w-full mt-2 p-2 rounded-md bg-slate-200"
                  value={available}
                  onChange={(e) => setAvailable(e.target.value)}
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
                  onChange={(e) => setOnSale(e.target.value)}
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
            <div className="mb-4">
              <span className="text-white dark:text-gray-200">Tags</span>
              <input
                required
                placeholder="Separe as tags por virgula"
                type="text"
                onChange={(e) => setTags(e.target.value)}
                value={tags}
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
              />
            </div>
          </div>
        </div>
      </div>

      {error && <p>{error}</p>}

      {error && <Message msg={error} type="error" />}
      {message && <Message msg={message} type="success" />}
    </div>
  );
};

export default EditProduct;
