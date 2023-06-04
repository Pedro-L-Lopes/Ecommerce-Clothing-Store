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

  const fields = [
    {
      id: 1,
      placeholder: "Nome da loja",
      type: "text",
      updateFunction: setName,
      value: name,
    },
    {
      id: 2,
      placeholder: "Email",
      type: "email",
      updateFunction: setEmail,
      value: email,
    },
    {
      id: 3,
      placeholder: "Rua/Avenida",
      type: "text",
      updateFunction: setStreet,
      value: street,
    },
    {
      id: 4,
      placeholder: "Número",
      type: "text",
      updateFunction: setNumber,
      value: number,
    },
    {
      id: 5,
      placeholder: "Bairro",
      type: "text",
      updateFunction: setNeighborhood,
      value: neighborhood,
    },
    {
      id: 6,
      placeholder: "Cidade",
      type: "text",
      updateFunction: setCity,
      value: city,
    },
    {
      id: 7,
      placeholder: "Estado",
      type: "text",
      updateFunction: setState,
      value: state,
    },
    {
      id: 7,
      placeholder: "Instagram (link)",
      type: "url",
      updateFunction: setInstagram,
      value: Instagram,
    },
    {
      id: 9,
      placeholder: "Senha atual",
      type: "password",
      updateFunction: setPassword,
      value: password,
    },
    {
      id: 10,
      placeholder: "Nova senha",
      type: "password",
      updateFunction: setConfirmPassword,
      value: confirmPassword,
    },
  ];

  const handleInputChange = (value, updateFunction) => {
    updateFunction(value);
  };

  return (
    <div className="flex justify-center">
      <div className="text-center">
        <h1 className="text-white text-5xl text">Store</h1>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
            {fields.map((field, index) => (
              <div key={index}>
                <label
                  className="text-white dark:text-gray-200"
                  htmlFor={field.id}
                ></label>
                <input
                  id={field.id}
                  placeholder={field.placeholder}
                  onChange={(e) =>
                    handleInputChange(e.target.value, field.updateFunction)
                  }
                  value={field.value || ""}
                  type={field.type}
                  className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                />
              </div>
            ))}
          </div>

          <button
            type="submit"
            className="px-8 py-2 mt-5 text-white bg-slate-700 rounded-md hover:bg-slate-600 focus:bg-slate-600focus:outline-none transition-all"
          >
            Atualizar
          </button>

          {error && <Message msg={error} type="error" />}
          {message && <Message msg={message} type="success" />}
        </form>
      </div>
    </div>
  );
};

export default EditProfile;
