import { Link } from "react-router-dom";
import Message from "../../../components/Message/Message";
import { useState, useEffect } from "react";
import { register, reset } from "../../../slices/authSlice";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error } = useSelector((state) => state.auth);

  const handleSubmit = (e) => {
    e.preventDefault();

    const user = {
      name,
      email,
      password,
      confirmPassword,
    };

    dispatch(register(user));
    navigate("/dashboard");
  };

  useEffect(() => {
    dispatch(reset());
  }, [dispatch]);

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
      placeholder: "Senha",
      type: "password",
      updateFunction: setPassword,
      value: password,
    },
    {
      id: 4,
      placeholder: "Confirme a sua senha",
      type: "password",
      updateFunction: setConfirmPassword,
      value: confirmPassword,
    },
  ];

  const handleInputChange = (value, updateFunction) => {
    updateFunction(value);
  };

  return (
    <>
      <section className="max-w-4xl p-6 mx-auto bg-indigo-600 rounded-md shadow-md dark:bg-gray-800 mt-20">
        <h1 className="text-xl font-bold text-white capitalize dark:text-white">
          Criar conta
        </h1>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
            {fields.map((field, index) => (
              <div key={index}>
                <label
                  className="text-white dark:text-gray-200"
                  htmlFor={field.id}
                >
                  {field.placeholder}
                </label>
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

          <div className="flex justify-between mt-6">
            <Link
              to="/login"
              className="text-gray-400 hover:text-white transition-all cursor-pointer"
            >
              Já tem conta? Entrar
            </Link>
            <button
              type="submit"
              className="px-8 py-2 text-white bg-slate-700 rounded-md hover:bg-slate-600 focus:bg-slate-600focus:outline-none"
            >
              Criar conta
            </button>
          </div>
        </form>
      </section>
      {error && <Message msg={error} type="error" />}
    </>
  );
};

export default Register;
