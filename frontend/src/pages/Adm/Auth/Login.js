import Message from "../../../components/Message/Message";
import { Link, redirect } from "react-router-dom";

// Hooks
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login, reset } from "../../../slices/authSlice";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error } = useSelector((state) => state.auth);

  const handleSubmit = (e) => {
    e.preventDefault();

    const user = {
      email,
      password,
    };

    dispatch(login(user));
    navigate("/dashboard");
  };

  useEffect(() => {
    dispatch(reset());
  }, [dispatch]);

  return (
    <main className="bg-slate-800 h-screen">
      <section className="flex flex-col justify-center items-center max-w-full p-6 mx-auto rounded-md shadow-md dark:bg-gray-800 border-2 border-gray-600">
        <h1 className="text-xl text-center font-bold text-white capitalize dark:text-white m-auto">
          Login
        </h1>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col items-center">
            <div>
              <label
                className="text-white dark:text-gray-200"
                htmlFor="emailAddress"
              >
                Email
              </label>
              <input
                id="emailAddress"
                type="email"
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
                value={email || ""}
                className="block w-full px-8 py-2 mt-2 mb-3 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
              />
            </div>

            <div>
              <label
                className="text-white dark:text-gray-200"
                htmlFor="password"
              >
                Senha
              </label>
              <input
                id="password"
                type="password"
                placeholder="Senha"
                onChange={(e) => setPassword(e.target.value)}
                value={password || ""}
                className="block w-full px-8 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
              />
            </div>
          </div>

          <div className="flex justify-center mt-6">
            <button
              type="submit"
              className="px-8 py-2 text-white bg-slate-700 rounded-md hover:bg-slate-600 focus:bg-slate-600focus:outline-none transition-all"
            >
              Entrar
            </button>
          </div>

          <div className="flex justify-center mt-2">
            <Link
              className="text-gray-400 hover:text-white transition-all cursor-pointer mr-5"
              to="/register"
            >
              Cadastar
            </Link>
            <p className="text-gray-400 hover:text-white transition-all cursor-pointer">
              Esqueceu a senha?
            </p>
          </div>
        </form>
        {error && <Message msg={error} type="error" />}
      </section>
    </main>
  );
};

export default Login;
