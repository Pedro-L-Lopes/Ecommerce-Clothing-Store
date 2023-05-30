import "../Profile/Profile.css";

import { uploads } from "../../../utils/config";

// Components
import Message from "../../../components/Message/Message";
import { Link } from "react-router-dom";
import { BsPencilFill, BsXLg } from "react-icons/bs";

// Hooks
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

// Redux
import { getUserDetails } from "../../../slices/userSlice";
import {
  resetMessage,
  getUserProducts,
  deleteProduct,
} from "../../../slices/productSlice";

const UnavailableProducts = () => {
  const { id } = useParams();

  const dispatch = useDispatch();

  // Pegando usuário atenticado e usuário que entrou no perfil dele
  // Usuário que entrou no perfil dele
  const { user, loading } = useSelector((state) => state.user);
  // Usuário autenticado // Renomenado pois colidem
  const { user: userAuth } = useSelector((state) => state.auth);
  const {
    products,
    loading: loadingProduct,
    message: messageProduct,
    error: errorProduct,
  } = useSelector((state) => state.product);

  // Carregando usuário // Por causa desse tem o preenchimento do user acima
  useEffect(() => {
    dispatch(getUserDetails(id));
    dispatch(getUserProducts(id));
  }, [dispatch, id]);

  const resetComponentMessage = () => {
    setTimeout(() => {
      dispatch(resetMessage());
    }, 2000);
  };

  // Deletando produto
  const handleDelete = async (id) => {
    dispatch(deleteProduct(id));

    resetComponentMessage();
  };

  if (loading) {
    return <p>Carregando...</p>;
  }

  return (
    <div id="profile">
      {/* Exibição de nome e logo da loja  */}
      <div className="profile-header">
        {user.profileImage && (
          <img src={`${uploads}/users/${user.profileImage}`} alt={user.name} />
        )}
        <div className="profile-description">
          <h2>{user.name}</h2>
        </div>
      </div>
      {id === userAuth._id && (
        <>
          <div className="user-photos">
            <h2>Produtos Indisponíveis</h2>
            <div className="photos-container">
              {products &&
                products
                  .filter((product) => !product.available)
                  .map((product) => (
                    <div className="photo" key={product._id}>
                      <Link to={`/products/${product._id}`}>
                        {product.images && product.images.length > 0 && (
                          <img
                            src={`${uploads}/products/${product.images[0].filename}`}
                            alt={product.name}
                          />
                        )}
                        <p>{product.name}</p>
                        <p>R$ {product.price}</p>
                      </Link>
                      {id === userAuth._id ? (
                        <div className="actions">
                          <Link to={`/products/${product._id}/edit`}>
                            <BsPencilFill />
                          </Link>
                          <BsXLg onClick={() => handleDelete(product._id)} />
                        </div>
                      ) : (
                        <Link className="btn" to={`/products/${product._id}`}>
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
      {products.length === 0 && <p>Ainda não há produtos publicados...</p>}
    </div>
  );
};

export default UnavailableProducts;
