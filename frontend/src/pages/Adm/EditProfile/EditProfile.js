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
  const [currentPassword, setCurrentPassword] = useState("");

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
      currentPassword,
    };

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

  return (
    <div className="flex justify-center items-center bg-slate-800 p-20 ml-10 rounded-lg">
      <div className="text-center">
        <h1 className="text-white text-5xl text">Store</h1>
        <h2 className="text-white">Insira a senha atual para alterar os dados</h2>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
            <div>
              <input
                placeholder="Nome da loja"
                onChange={(e) => setName(e.target.value)}
                value={name}
                type="text"
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
              />
            </div>

            <div>
              <input
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                type="email"
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
              />
            </div>

            <div>
              <input
                placeholder="Senha atual"
                onChange={(e) => setCurrentPassword(e.target.value)}
                value={currentPassword}
                type="password"
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
              />
            </div>

            <div>
              <input
                placeholder="Nova senha"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                type="password"
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
              />
            </div>
          </div>
          <button
            type="submit"
            className="px-8 py-2 mt-5 text-white bg-slate-700 rounded-md hover:bg-slate-600 focus:bg-slate-600focus:outline-none transition-all"
          >
            Atualizar
          </button>
        </form>
      </div>
      {error && <Message msg={error} type="error" />}
      {message && <Message msg={message} type="success" />}
    </div>
  );
};

export default EditProfile;
