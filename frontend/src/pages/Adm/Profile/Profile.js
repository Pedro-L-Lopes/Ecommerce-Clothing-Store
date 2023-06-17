import { uploads } from "../../../utils/config";
import Message from "../../../components/Message/Message";
import { Link } from "react-router-dom";
import { BsPencilFill, BsXLg } from "react-icons/bs";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { getUserDetails } from "../../../slices/userSlice";
import {
  resetMessage,
  getUserProducts,
  deleteProduct,
} from "../../../slices/productSlice";
import Loading from "../../../components/Loading/Loading";
import { allCategories } from "../../../components/AnotherComponentsAndFunctions/AnotherComponentsAndFunctions";

const Profile = () => {
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

  const [theFilter, setTheFilter] = useState("all");
  const [selectedCategory, setSelectedCategory] = useState("");

  useEffect(() => {
    dispatch(getUserDetails(id));
    dispatch(getUserProducts(id));
  }, [dispatch, id]);

  const resetComponentMessage = () => {
    setTimeout(() => {
      dispatch(resetMessage());
    }, 2000);
  };

  const handleDelete = async (id) => {
    dispatch(deleteProduct(id));
    resetComponentMessage();
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center">
        <Loading />
      </div>
    );
  }

  const formatPrice = (price) => {
    return price.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
      minimumFractionDigits: 2,
    });
  };

  return (
    <div className="p-4">
      {id === userAuth._id && (
        <>
          <div className="mb-4">
            <div className="flex flex-col md:flex-row">
              <select
                className="text-white bg-slate-700 rounded text-xl font-bold -mt-12 mb-2 p-2 focus:outline-none"
                onChange={(e) => setTheFilter(e.target.value)}
              >
                <option value="all">Todos os produtos</option>
                <option value="available">Produtos disponíveis</option>
                <option value="unavailable">Produtos indisponíveis</option>
                <option value="onSale">Produtos em promoção</option>
                <option value="onSaleAvailable">
                  Produtos disponíveis e em promoção
                </option>
                <option value="onSaleUnavailable">
                  Produtos indisponíveis e em promoção
                </option>
              </select>
              <select
                className="text-white bg-slate-700 rounded text-xl font-bold -mt-12 mb-2 p-2 ml-2 focus:outline-none"
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                <option value="">Todas as categorias</option>
                {allCategories &&
                  allCategories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
              </select>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-2">
              {products &&
                products
                  .filter((product) => {
                    if (theFilter === "all") {
                      return true;
                    } else if (theFilter === "available") {
                      return product.available;
                    } else if (theFilter === "unavailable") {
                      return !product.available;
                    } else if (theFilter === "onSale") {
                      return product.onSale;
                    } else if (theFilter === "onSaleAvailable") {
                      return product.available && product.onSale;
                    } else if (theFilter === "onSaleUnavailable") {
                      return !product.available && product.onSale;
                    }
                    return true;
                  })
                  .filter((product) => {
                    if (selectedCategory === "") {
                      return true;
                    } else {
                      return product.category === selectedCategory;
                    }
                  })
                  .map((product) => (
                    <div
                      key={product._id}
                      className="bg-slate-700 p-2 rounded shadow flex items-center justify-between"
                    >
                      <div>
                        <Link
                          to={`/products/${product._id}`}
                          className="flex items-center"
                        >
                          {product.images && product.images.length > 0 && (
                            <img
                              src={`${uploads}/products/${product.images[0].filename}`}
                              alt={product.name}
                              className="w-16 h-16 rounded"
                            />
                          )}
                          <div className="line-clamp-2">
                            {product.onSale === true ? (
                              <>
                                <div className="flex">
                                  <del className="text-gray-300 mr-2 ml-2">
                                    {formatPrice(product.price)}
                                  </del>
                                  <p>{formatPrice(product.salePrice)}</p>
                                </div>
                              </>
                            ) : (
                              <p className="font-semibold ml-2">
                                {formatPrice(product.price)}
                              </p>
                            )}
                            <p className="ml-2">{product.name}</p>
                          </div>
                        </Link>
                      </div>
                      {id === userAuth._id ? (
                        <div>
                          <Link
                            to={`/products/${product._id}/edit`}
                            className="text-blue-500 mr-2"
                          >
                            <BsPencilFill />
                          </Link>
                          <BsXLg
                            onClick={() => handleDelete(product._id)}
                            className="text-red-500 cursor-pointer"
                          />
                        </div>
                      ) : (
                        <Link
                          className="bg-blue-500 text-white px-4 py-2 rounded"
                          to={`/products/${product._id}`}
                        >
                          Ver
                        </Link>
                      )}
                    </div>
                  ))}
            </div>
          </div>
          {errorProduct && <Message msg={errorProduct} type="error" />}
          {messageProduct && <Message msg={messageProduct} type="success" />}
        </>
      )}
      {products.length === 0 && (
        <p className="text-gray-500">Ainda não há produtos publicados...</p>
      )}
    </div>
  );
};

export default Profile;
