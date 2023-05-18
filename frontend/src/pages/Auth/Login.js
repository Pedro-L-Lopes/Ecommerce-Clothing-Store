import "./Auth.css";

// Components
import { Link } from "react-router-dom";
import Message from "../../components/Message";

// Hooks
import { useState, useEffect } from "react";

// Redux
import { register, reset } from "../../slices/authSlice";
import { useSelector, useDispatch } from "react-redux";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div id="login">
      <h2>Shopnaw</h2>
      <p className="subtitle">Entre na sua conta</p>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
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
        <input type="submit" value="Entrar" />
      </form>
      <p>
        Não tem uma conta? <Link to="/register">Criar</Link>
      </p>
    </div>
  );
};

export default Login;
