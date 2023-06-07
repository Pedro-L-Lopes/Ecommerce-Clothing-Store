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
  const [confirmPassword, setConfirmPassword] = useState("");
  const [street, setStreet] = useState("");
  const [number, setNumber] = useState("");
  const [neighborhood, setNeighborhood] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [Instagram, setInstagram] = useState("");

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

  const handleNameChange = (value) => {
    setName(value);
  };

  const handleEmailChange = (value) => {
    setEmail(value);
  };

  const handlePasswordChange = (value) => {
    setPassword(value);
  };

  const handleConfirmPasswordChange = (value) => {
    setConfirmPassword(value);
  };

  return (
    <div className="flex justify-center">
      <div className="text-center">
        <h1 className="text-white text-5xl text">Store</h1>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
            <div>
              <label htmlFor="name" className="text-white dark:text-gray-200">
                Nome da loja
              </label>
              <input
                id="name"
                placeholder="Nome da loja"
                onChange={(e) => handleNameChange(e.target.value)}
                value={name}
                type="text"
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
              />
            </div>

            <div>
              <label htmlFor="email" className="text-white dark:text-gray-200">
                Email
              </label>
              <input
                id="email"
                placeholder="Email"
                onChange={(e) => handleEmailChange(e.target.value)}
                value={email}
                type="email"
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="text-white dark:text-gray-200"
              >
                Senha atual
              </label>
              <input
                id="password"
                placeholder="Senha atual"
                onChange={(e) => handlePasswordChange(e.target.value)}
                value={password}
                type="password"
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
              />
            </div>

            <div>
              <label
                htmlFor="confirmPassword"
                className="text-white dark:text-gray-200"
              >
                Nova senha
              </label>
              <input
                id="confirmPassword"
                placeholder="Nova senha"
                onChange={(e) => handleConfirmPasswordChange(e.target.value)}
                value={confirmPassword}
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
    </div>
  );
};

export default EditProfile;
