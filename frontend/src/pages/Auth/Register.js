import "./Auth.css";

// Components
import { Link } from "react-router-dom";

// Hooks
import { useState, useEffect } from "react";

// Redux
import { register, reset } from "../../slices/authSlice";
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

    console.log(user);

    dispatch(register(user)); // Usando a função register para pssar os dados do usuário para a api e receber uma resposta
  };

  // Ativado sempre que acontecer um dispatch para resetar os estados
  useEffect(() => {
    dispatch(reset());
  }, [dispatch]);

  return (
    <div id="register">
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
        <input type="submit" value="Cadastar" />
      </form>
      <p>
        Já tem conta? <Link to="login">Entrar</Link>
      </p>
    </div>
  );
};

export default Register;
