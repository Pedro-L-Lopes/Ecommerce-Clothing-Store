import "../Profile/Profile.css";

import { uploads } from "../../utils/config";

// Components
import Message from "../../components/Message";
import { Link } from "react-router-dom";

// Hooks
import { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

// Redux
import { getUserDetails } from "../../slices/userSlice";
import {
  resetMessage,
  getUserProducts,
  updateProduct,
} from "../../slices/photoSlice";

const EditProduct = () => {
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

  const [oId, setOId] = useState("")
  const [name, setName] = useState("");
  const [images, setImages] = useState([]);
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState();
  const [size, setSize] = useState([]);
  const [onSale, setOnSale] = useState(false);
  const [salePrice, setSalePrice] = useState(0);
  const [available, setAvailable] = useState(true);

  // Editar a nivel de dom
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

  // Mostrando ou escondendo formulario de edição
  const hideOrShowForm = () => {
    editProductForm.current.classList.toggle("hide");
  };

  // Atualizando produto
  const handleUpdate = (e) => {
    e.preventDefault();

    const productData = {
      name: name,
      id: id,
    };

    dispatch(updateProduct(productData));

    resetComponentMessage();
  };

  // Abrindo formulario de edição
  const handleEdit = (product) => {
    if (editProductForm.current.classList.contains("hide")) {
      hideOrShowForm();
    }

    setOId(product._id);
    setName(product.name);
    setImages(product.images[0].filename);
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
    <div>
      {id === userAuth._id && (
        <>
          <div className="edit-photo hide" ref={editProductForm}>
            <p>Editando</p>
            {images && (
              <img src={`${uploads}/product/${images}`} alt={name} />
            )}
            <form onSubmit={handleUpdate}>
              <input
                type="text"
                placeholder="Nome"
                onChange={(e) => setName(e.target.value)}
                value={name || ""}
              />

              <input type="submit" value="Atualizar" />
              <button className="cancel-btn" onClick={handleCancelEdit}>
                Cancelar
              </button>
            </form>
          </div>
        </>
      )}
    </div>
  );
};

export default EditProduct;
