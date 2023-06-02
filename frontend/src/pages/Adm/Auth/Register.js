import styles from "./Auth.module.css";

// Components
import { Link } from "react-router-dom";
import Message from "../../../components/Message/Message";

// Hooks
import { useState, useEffect } from "react";

// Redux
import { register, reset } from "../../../slices/authSlice";
import { useSelector, useDispatch } from "react-redux";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmpassword] = useState("");

  // Permite usar as funções do redux
  const dispatch = useDispatch();

  // Extraindo estados do slice
  const { loading, error } = useSelector((state) => state.auth);

  const handleSubmit = (e) => {
    e.preventDefault();

    const user = {
      name,
      email,
      password,
      confirmPassword,
    };

    dispatch(register(user)); // Usando a função register para pssar os dados do usuário para a api e receber uma resposta
  };

  // Ativado sempre que acontecer um dispatch para resetar os estados
  useEffect(() => {
    dispatch(reset());
  }, [dispatch]);

  return (
    <>
      <section className="max-w-4xl p-6 mx-auto bg-indigo-600 rounded-md shadow-md dark:bg-gray-800 mt-20">
        <h1 className="text-xl font-bold text-white capitalize dark:text-white">
          Criar conta
        </h1>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
            <div>
              <label
                className="text-white dark:text-gray-200"
                htmlFor="username"
              >
                Nome
              </label>
              <input
                id="username"
                placeholder="Nome da loja"
                onChange={(e) => setName(e.target.value)}
                value={name || ""}
                type="text"
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
              />
            </div>

            <div>
              <label
                className="text-white dark:text-gray-200"
                htmlFor="emailAddress"
              >
                Email
              </label>
              <input
                id="emailAddress"
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
                value={email || ""}
                type="email"
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
              />
            </div>
            {/* Endereço */}
            <div>
              <label className="text-white dark:text-gray-200" htmlFor="street">
                Endereço
              </label>
              <input
                id="street"
                placeholder="Rua ou Avenida"
                // onChange={(e) => setName(e.target.value)}
                // value={name || ""}
                type="text"
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
              />
            </div>

            <div>
              <label className="text-white dark:text-gray-200" htmlFor="city">
                Cidade
              </label>
              <input
                id="city"
                placeholder="Cidade"
                // onChange={(e) => setName(e.target.value)}
                // value={name || ""}
                type="text"
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
              />
            </div>

            <div>
              <label className="text-white dark:text-gray-200" htmlFor="cep">
                CEP
              </label>
              <input
                id="cep"
                placeholder="CEP"
                // onChange={(e) => setName(e.target.value)}
                // value={name || ""}
                type="number"
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
              />
            </div>

            <div>
              <label className="text-white dark:text-gray-200" htmlFor="state">
                Estado
              </label>
              <input
                id="state"
                placeholder="Estado"
                // onChange={(e) => setName(e.target.value)}
                // value={name || ""}
                type="text"
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
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
                placeholder="Senha"
                onChange={(e) => setPassword(e.target.value)}
                value={password || ""}
                type="password"
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
              />
            </div>

            <div>
              <label
                className="text-white dark:text-gray-200"
                htmlFor="passwordConfirmation"
              >
                Confirmação de senha
              </label>
              <input
                id="passwordConfirmation"
                placeholder="Confirme a sua senha"
                onChange={(e) => setConfirmpassword(e.target.value)}
                value={confirmPassword || ""}
                type="password"
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
              />
            </div>
          </div>

          <div className="flex justify-between mt-6">
            <Link
              to="/login"
              className="text-gray-700 hover:text-white transition-all cursor-pointer"
            >
              Já tem conta? Entrar
            </Link>
            <button
              type="submit"
              className="px-8 py-2 text-white bg-indigo-500 rounded-md hover:bg-indigo-600 focus:bg-indigo-700 focus:outline-none"
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

{
  /* <div id="register">
      <h2>Shopnaw</h2>
      <p className="subtitle">Cadastre-se</p>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Nome"
          onChange={(e) => setName(e.target.value)}
          value={name || ""}
        />
        <input
          type="email"
          placeholder="E-mail"
          onChange={(e) => setEmail(e.target.value)}
          value={email || ""}
        />
        <input
          type="password"
          placeholder="Senha"
          onChange={(e) => setPassword(e.target.value)}
          value={password || ""}
        />
        <input
          type="password"
          placeholder="Confirme a senha"
          onChange={(e) => setConfirmpassword(e.target.value)}
          value={confirmPassword || ""}
        />
        {!loading && <input type="submit" value="Cadastar" />}
        {loading && <input type="submit" value="Aguarde..." disabled />}
        {error && <Message msg={error} type="error" />}
      </form>
      <p>
        Já tem conta? <Link to="/login">Entrar</Link>
      </p>
    </div> */
}
