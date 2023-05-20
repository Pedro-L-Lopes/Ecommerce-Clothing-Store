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
import { publishProduct, resetMessage } from "../../slices/photoSlice";

const Profile = () => {
  const { id } = useParams();

  const dispatch = useDispatch();

  // Pegando usuário atenticado e usuário que entrou no perfil dele
  // Usuário que entrou no perfil dele
  const { user, loading } = useSelector((state) => state.user);
  // Usuário autenticado // Renomenado pois colidem
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
  const [size, setSize] = useState([]);
  const [onSale, setOnSale] = useState(false);
  const [salePrice, setSalePrice] = useState(0);
  const [available, setAvailable] = useState(true);

  // Novo formulario e editar a nivel de dom
  const newProductForm = useRef();
  const editProductForm = useRef();

  // Carregando usuário // Por causa desse tem o preenchimento do user acima
  useEffect(() => {
    dispatch(getUserDetails(id));
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

    setName("");

    setTimeout(() => {
      dispatch(resetMessage());
    }, 2000);
  };

  if (loading) {
    return <p>Carregando...</p>;
  }

  return (
    <div id="profile">
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
          <div className="new-photo" ref={newProductForm}>
            <h3>Adicionar produto</h3>
            <form onSubmit={submitHandle}>
              <label>
                <span>Nome:</span>
                <input
                  type="text"
                  placeholder="Nome"
                  onChange={(e) => setName(e.target.value)}
                  value={name || ""}
                />
              </label>
              <label>
                <span>Fotos:</span>
                <input type="file" onChange={handleFile} multiple />
              </label>
              <label>
                <span>Preço:</span>
                <input type="number" />
              </label>
              {/* <label>
                <span>Descrição:</span>
                <textarea
                  id="description"
                  name="description"
                  rows="4"
                  cols="50"
                ></textarea>
              </label> */}
              {/* <label>
                <span>Tamanhos:</span>
                <label>
                  <input type="checkbox" value="P Baby Look" /> P Baby Look
                </label>
                <label>
                  <input type="checkbox" value="P" />P
                </label>
                <label>
                  <input type="checkbox" value="M" />M
                </label>
                <label>
                  <input type="checkbox" value="G" />G
                </label>
                <label>
                  <input type="checkbox" value="GG" />
                  GG
                </label>
                <label>
                  <input type="checkbox" value="EGG" />
                  EGG
                </label>
              </label>
              <label>
                <span>Em promoção: </span>
                <input type="button" value="mudar depois" />
              </label> */}
              {/* <label>
                <span>Preço promocional:</span>
                <input type="number" />
              </label> */}
              {/* <label>
                <span>Diponível:</span>
                <input type="button" value="Mudar depois" />
              </label> */}
              {!loadingProduct && <input type="submit" value="Adicionar" />}
              {loadingProduct && (
                <input type="submit" value="Aguarde..." disabled />
              )}
            </form>
          </div>
          {errorProduct && <Message msg={errorProduct} type="error" />}
          {messageProduct && <Message msg={messageProduct} type="success" />}
        </>
      )}
    </div>
  );
};

export default Profile;
