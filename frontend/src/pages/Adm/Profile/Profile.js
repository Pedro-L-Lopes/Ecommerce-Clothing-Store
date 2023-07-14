import { uploads } from "../../../utils/config";
import Message from "../../../components/Message/Message";
import { BsPencilFill, BsXLg } from "react-icons/bs";
import { BiEditAlt } from "react-icons/bi";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { getUserDetails } from "../../../slices/userSlice";
import {
  resetMessage,
  getUserProducts,
  deleteProduct,
} from "../../../slices/productSlice";
import Loading from "../../../components/Loading/Loading";
import {
  PageColor,
  allCategories,
  formatPrice,
} from "../../../components/AnotherComponentsAndFunctions/AnotherComponentsAndFunctions";
import DeleteConfirmation from "../../../components/DeleteConfirmation/DeleteConfirmation";

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
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [productIdToDelete, setProductIdToDelete] = useState(null);

  useEffect(() => {
    dispatch(getUserDetails(id));
    PageColor("rgb(31 41 55)");
    return () => {
      PageColor(""); // Reverte a cor da página ao desmontar o componente
    };
  }, [dispatch, id]);

  useEffect(() => {
    dispatch(getUserProducts(id));
  }, [dispatch, id]);

  const resetComponentMessage = () => {
    setTimeout(() => {
      dispatch(resetMessage());
    }, 2000);
  };

  const handleDelete = (id) => {
    setProductIdToDelete(id);
    setShowDeleteModal(true);
  };

  const confirmDelete = (id) => {
    dispatch(deleteProduct(id));
    resetComponentMessage();
    setShowDeleteModal(false);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center">
        <Loading />
      </div>
    );
  }

  const filterFunctions = {
    all: () => true,
    available: (product) => product.available,
    unavailable: (product) => !product.available,
    onSale: (product) => product.onSale,
    onSaleAvailable: (product) => product.available && product.onSale,
    onSaleUnavailable: (product) => !product.available && product.onSale,
  };

  return (
    <div className="p-4">
      {id === userAuth._id && (
        <>
          <div className="mb-4">
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
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-2">
              {products &&
                products
                  .filter(filterFunctions[theFilter] || filterFunctions.all)
                  .filter((product) => {
                    return (
                      selectedCategory === "" ||
                      product.category === selectedCategory
                    );
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
                            className="text-white mr-2"
                          >
                            <BiEditAlt size="20" />
                          </Link>
                          <BsXLg
                            onClick={() => handleDelete(product._id)}
                            className="text-red-600 cursor-pointer"
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
              {showDeleteModal && (
                <DeleteConfirmation
                  title="Excluir o produto?"
                  close={() => setShowDeleteModal(false)}
                  remove={() => confirmDelete(productIdToDelete)}
                />
              )}
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
