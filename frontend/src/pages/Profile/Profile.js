import "./Profile.css";

import { uploads } from "../../utils/config";

// Components
import Message from "../../components/Message";
import { Link } from "react-router-dom";
import { BsPencilFill, BsXLg } from "react-icons/bs";
import EditModal from "../../components/EditModal";

// Hooks
import { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

// Redux
import { getUserDetails } from "../../slices/userSlice";
import {
  resetMessage,
  getUserProducts,
  deleteProduct,
  updateProduct,
} from "../../slices/photoSlice";

const Profile = () => {
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

  const [name, setName] = useState("");
  const [images, setImages] = useState([]);
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState();
  const [size, setSize] = useState([]);
  const [onSale, setOnSale] = useState(false);
  const [salePrice, setSalePrice] = useState(0);
  const [available, setAvailable] = useState(true);

  const [editId, setEditId] = useState("");
  const [editImages, setEditImages] = useState("");
  const [editName, setEditName] = useState("");
  const [editPrice, setEditPrice] = useState("");

  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  // Novo formulario e editar a nivel de dom
  const editProductForm = useRef();

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

  function hideOrShowForms() {
    editProductForm.current.classList.toggle("hide");
  }

  // Show edit form
  const handleEdit = (product) => {
    if (editProductForm.current.classList.contains("hide")) {
      hideOrShowForms();
    }

    setEditId(product._id);
    setEditImages(product.images);
    setEditName(product.name);
    setEditPrice(product.price);
  };

  // Cancel editing
  const handleCancelEdit = () => {
    hideOrShowForms();
  };

  // Atualizando produto
  const handleUpdate = (e) => {
    e.preventDefault();

    const productData = {
      name: editName,
      id: editId,
    };

    dispatch(updateProduct(productData));

    resetComponentMessage();
  };

  // // Abrindo formulario de edição
  // const handleEdit = (product) => {
  //   setSelectedProduct(product);
  //   setShowEditModal(true);
  // };

  // const handleUpdateModal = () => {
  //   setShowEditModal(false);
  // }

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
          <div className="edit-photo hide" ref={editProductForm}>
            <p>Editando</p>
            {editImages && (
              <img
                src={`${uploads}/products/${editImages[0].filename}`}
                alt={editName}
              />
            )}
            <form onSubmit={handleUpdate}>
              <input
                type="text"
                placeholder="Nome"
                onChange={(e) => setEditName(e.target.value)}
                value={editName || ""}
              />
              <input
                type="number"
                placeholder="Preço"
                onChange={(e) => setEditPrice(e.target.value)}
                value={editPrice || ""}
              />
              <input type="submit" value="Atualizar" />
              <button className="cancel-btn" onClick={handleCancelEdit}>
                Fechar
              </button>
            </form>
          </div>
          <div className="user-photos">
            <h2>Produtos publicados</h2>
            <div className="photos-container">
              {products &&
                products.map((product) => (
                  <div className="photo" key={product._id}>
                    <Link to={`/products/${product._id}`}>
                      {product.images && product.images.length > 0 && (
                        <img
                          src={`${uploads}/products/${product.images[0].filename}`}
                          alt={product.name}
                        />
                      )}
                      <p>{product.name}</p>
                      {onSale || onSale != 0 ? (
                        <>
                          <p>{product.salePrice}</p>
                          <p>{product.price}</p>
                        </>
                      ) : (
                        <p>R$ {product.price}</p>
                      )}
                    </Link>

                    {/* {showEditModal && (
                      <EditModal
                        product={selectedProduct}
                        onClose={() => setShowEditModal(false)}
                        onUpdate={handleUpdateModal}
                      />
                    )} */}

                    {id === userAuth._id ? (
                      <div className="actions">
                        <BsPencilFill onClick={() => handleEdit(product)} />
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

export default Profile;

// onClick={() => handleEdit(product)}
