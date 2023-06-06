import { uploads } from "../../../utils/config";
import Message from "../../../components/Message/Message";
import { Link } from "react-router-dom";
import { BsPencilFill, BsXLg } from "react-icons/bs";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { getUserDetails } from "../../../slices/userSlice";
import {
  resetMessage,
  getUserProducts,
  deleteProduct,
} from "../../../slices/productSlice";

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
    return <p>Carregando...</p>;
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
            <h2 className="text-xl font-bold mb-2">Produtos disponíveis</h2>
            <div className="grid grid-cols-2 gap-2">
              {products &&
                products
                  .filter((product) => product.available)
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
                          <div>
                            <p className="font-semibold ml-2">
                              {formatPrice(product.price)}
                            </p>
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
