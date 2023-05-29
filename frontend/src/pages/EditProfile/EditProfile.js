import "./EditProfile.css";

import { uploads } from "../../utils/config";

// Hooks
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

// Redux
import { profile, resetMessage, updateProfile } from "../../slices/userSlice";

// Components
import Message from "../../components/Message";

const EditProfile = () => {
  const dispatch = useDispatch();

  const { user, message, error, loading } = useSelector((state) => state.user);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [profileImage, setProfileImage] = useState("");
  const [previewImage, setPreviewImage] = useState("");

  // Carregando dados do usuário
  useEffect(() => {
    dispatch(profile());
  }, [dispatch]);

  // Prencher dados do usuário no formulario
  useEffect(() => {
    if (user && user.name && user.email) {
      setName(user.name);
      setEmail(user.email);
    }
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Pegando states do user e colocando em um objeto
    const userData = {
      name,
    };

    if (profileImage) {
      userData.profileImage = profileImage;
    }

    if (password) {
      userData.password = password;
    } 

    // // Construindo form data
    // const formData = new FormData(); // Instanciando um novo objeto chamado form data

    // // Fazendo um loop em todas as chaves que vão ser enviadas
    // const userFormData = Object.keys(userData).forEach((key) =>
    //   formData.append(key, userData[key])
    // );

    // formData.append("user", userFormData);

    // dispatch(updateProfile(userFormData));

    const userFormData = Object.keys(userData).reduce((formData, key) => {
      formData.append(key, userData[key]);
      return formData;
    }, new FormData());

    await dispatch(updateProfile(userFormData));

    setTimeout(() => {
      dispatch(resetMessage());
    }, 2000);
  };

  const handleFile = (e) => {
    // Preview da imagem // pegando imagem para exibir depois
    const image = e.target.files[0];

    setPreviewImage(image);

    // Atualizando o state da imagem
    setProfileImage(image);
  };

  return (
    <div id="edit-profile">
      <h2>Edite seus dados</h2>
      <p className="subtitle">Adicione uma imagem de perfil</p>
      {/* Checa se o usuário tem uma imagem de perfil ou se o preview mudou o dado */}
      {(user.profileImage || previewImage) && (
        <img
          className="profile-image"
          src={
            previewImage
              ? URL.createObjectURL(previewImage) // Gerando imagem temporaria (entre o pc e o servidor)
              : `${uploads}/users/${user.profileImage}` // Acessando pasta de uploads
          }
          alt={user.name}
        />
      )}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Nome"
          onChange={(e) => setName(e.target.value)}
          value={name || ""}
        />
        <input type="email" placeholder="E-mail" disabled value={email || ""} />
        <label>
          <span>Foto de perfil</span>
          <input type="file" onChange={handleFile} />
        </label>
        <label>
          <span>Alterar a senha: </span>
          <input
            type="password"
            placeholder="Digite sua nova senha"
            onChange={(e) => setPassword(e.target.value)}
            value={password || ""}
          />
        </label>
        {!loading && <input type="submit" value="Atualizar" />}
        {loading && <input type="submit" value="Aguarde..." disabled />}
        {error && <Message msg={error} type="error" />}
        {message && <Message msg={message} type="success" />}
      </form>
    </div>
  );
};

export default EditProfile;
