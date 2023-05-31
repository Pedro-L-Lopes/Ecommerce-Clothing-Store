import "./EditProfile.css";
import { uploads } from "../../../utils/config";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  profile,
  resetMessage,
  updateProfile,
} from "../../../slices/userSlice";
import Message from "../../../components/Message/Message";

const EditProfile = () => {
  const dispatch = useDispatch();
  const { user, message, error, loading } = useSelector((state) => state.user);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [profileImage, setProfileImage] = useState("");
  const [previewImage, setPreviewImage] = useState("");

  useEffect(() => {
    dispatch(profile());
  }, [dispatch]);

  useEffect(() => {
    if (user && user.name && user.email) {
      setName(user.name);
      setEmail(user.email);
    }
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const userData = {
      name,
    };

    if (profileImage) {
      userData.profileImage = profileImage;
    }

    if (password) {
      userData.password = password;
    }

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
    const image = e.target.files[0];

    setPreviewImage(image);
    setProfileImage(image);
  };

  return (
    <div className="flex justify-center">
      <div className="text-center">
        {/* {(user.profileImage || previewImage) && (
          <img
            className="w-32 h-32 object-cover rounded-full mx-auto mb-4"
            src={
              previewImage
                ? URL.createObjectURL(previewImage)
                : `${uploads}/users/${user.profileImage}`
            }
            alt={user.name}
          />
        )} */}
        <form onSubmit={handleSubmit}>
          <h2 className="text-2xl font-bold mb-4">Edite seus dados</h2>
          <input
            type="text"
            placeholder="Nome"
            className="w-full mb-4 px-4 py-2 border border-gray-300 rounded"
            onChange={(e) => setName(e.target.value)}
            value={name || ""}
          />

          <input
            type="email"
            placeholder="E-mail"
            className="w-full mb-4 px-4 py-2 border border-gray-300 rounded"
            disabled
            value={email || ""}
          />

          {/* <label className="block mb-4">
            <span className="mb-1 inline-block">Foto de perfil</span>
            <input type="file" onChange={handleFile} className="hidden" />
            <div className="flex items-center justify-between px-4 py-2 border border-gray-300 rounded bg-white cursor-pointer">
              <span className="text-gray-500 flex items-center ">Escolher arquivo</span>
            </div>
          </label> */}

          <label className="block mb-4">
            <span className="mb-1 inline-block">Alterar a senha</span>
            <input
              type="password"
              placeholder="Digite sua nova senha"
              className="w-full px-4 py-2 border border-gray-300 rounded"
              onChange={(e) => setPassword(e.target.value)}
              value={password || ""}
            />
          </label>

          {!loading ? (
            <input
              type="submit"
              value="Atualizar"
              className="px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 cursor-pointer"
            />
          ) : (
            <input
              type="submit"
              value="Aguarde..."
              disabled
              className="px-6 py-2 bg-gray-300 text-white rounded cursor-not-allowed"
            />
          )}

          {error && <Message msg={error} type="error" />}
          {message && <Message msg={message} type="success" />}
        </form>
      </div>
    </div>
  );
};

export default EditProfile;
