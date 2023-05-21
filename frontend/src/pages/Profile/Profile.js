import "./Profile.css";

import { uploads } from "../../utils/config";

// Components
import Message from "../../components/Message";
import { Link } from "react-router-dom";
import { BsFillEyeFill, BsPencilFill, BsXLg } from "react-icons/bs";

// Hooks
import { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

// Redux
import { getUserDetails } from "../../slices/userSlice";
import {
  publishProduct,
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

  // Novo formulario e editar a nivel de dom
  const newProductForm = useRef();
  const editProductForm = useRef();

  // Carregando usuário // Por causa desse tem o preenchimento do user acima
  useEffect(() => {
    dispatch(getUserDetails(id));
    dispatch(getUserProducts(id));
  }, [dispatch, id]);

  // const handleFile = (e) => {
  //   const image = e.target.files[0];

  //   setImages(image);
  // };
  const handleFile = (e) => {
    const selectedImages = Array.from(e.target.files);
    if (selectedImages.length > 3) {
      alert("Adicione no maxímo três fotos!");
      return;
    }
    setImages(selectedImages);
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

  // Deletando produto
  const handleDelete = async (id) => {
    dispatch(deleteProduct(id));

    resetComponentMessage();
  };

  // Mostrando ou escondendo formulario de edição
  const hideOrShowForm = () => {
    newProductForm.current.classList.toggle("hide");
    editProductForm.current.classList.toggle("hide");
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

  // Abrindo formulario de edição
  const handleEdit = (product) => {
    if (editProductForm.current.classList.contains("hide")) {
      hideOrShowForm();
    }

    setEditId(product._id);
    setEditName(product.name);
    setEditImages(product.images[0].filename);
  };

  const handleCancelEdit = (e) => {
    e.preventDefault();
    hideOrShowForm();
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
      {/* Exibição de nome e logo da loja  */}
      <div className="profile-header">
        {user.profileImage && (
          <img src={`${uploads}/users/${user.profileImage}`} alt={user.name} />
        )}
        <div className="profile-description">
          <h2>{user.name}</h2>
        </div>
      </div>

      {/* Verifica a loja e exibe o formulario de cadastro de produtos */}
      {id === userAuth._id && (
        <>
          
          <div className="edit-photo hide" ref={editProductForm}>
            <p>Editando</p>
            {editImages && (
              <img src={`${uploads}/products/${editImages}`} alt={editName} />
            )}
            <form onSubmit={handleUpdate}>
              <input
                type="text"
                placeholder="Nome"
                onChange={(e) => setEditName(e.target.value)}
                value={editName || ""}
              />

              <input type="submit" value="Atualizar" />
              <button className="cancel-btn" onClick={handleCancelEdit}>
                Cancelar
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
                      {product.images && (
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
    </div>
  );
};

export default Profile;
