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

const Profile = () => {
  const { id } = useParams();

  const dispatch = useDispatch();

  // Pegando usuário atenticado e usuário que entrou no perfil dele
  // Usuário que entrou no perfil dele
  const { user, loading } = useSelector((state) => state.user);
  // Usuário autenticado // Renomenado pois colidem
  const { user: userAuth } = useSelector((state) => state.auth);

  // Novo formulario e editar a nivel de dom
  const newProductForm = useRef();
  const editProductForm = useRef();

  // Carregando usuário // Por causa desse tem o preenchimento do user acima
  useEffect(() => {
    dispatch(getUserDetails(id));
  }, [dispatch, id]);

  const submitHandle = (e) => {
    e.preventDefault();
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
          <div className="new-phoro" ref={newProductForm}>
            <h3>Adicionar produto</h3>
            <form onSubmit={submitHandle}>
              <label>
                <span>Nome:</span>
                <input type="text" placeholder="Nome" />
              </label>
              <label>
                <span>Fotos:</span>
                <input type="file" />
              </label>
              <label>
                <span>Preço:</span>
                <input type="number" />
              </label>
              <label>
                <span>Descrição:</span>
                <textarea
                  id="description"
                  name="description"
                  rows="4"
                  cols="50"
                ></textarea>
              </label>
              <label>
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
                <input type="button" value="mudar depois"/>
              </label>
              <label>
                <span>Preço promocional:</span>
                <input type="number" />
              </label>
              <label>
                <span>Diponível:</span>
                <input type="button" value="Mudar depois" />
              </label>
              <input type="submit" value="Adicionar" />
            </form>
          </div>
        </>
      )}
    </div>
  );
};

export default Profile;
