import styles from "./Navbar.module.css";

// Components
import { NavLink, Link } from "react-router-dom";
import {
  BsSearch,
  BsHouseDoorFill,
  BsFillPersonFill,
  BsFillCameraFill,
  BsPlus,
} from "react-icons/bs";

// Hooks
import { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

// Rdeux
import { logout, reset } from "../slices/authSlice";

import logo from "../images/logo.png";

const Navbar = () => {
  const { auth } = useAuth();
  const { user } = useSelector((state) => state.auth);

  const [query, setQuery] = useState("");

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const handleLogout = () => {
    //Não precisa de useEffect pq só tem uma ação, da dispatch nas duas e ta tudo certo
    dispatch(logout());
    dispatch(reset());

    navigate("/login");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (query) {
      return navigate(`/search?q=${query}`);
    }
  };

  return (
    <nav className={styles.nav}>
      <Link to="/">
        <img className={styles.navLogo} src={logo} />
      </Link>

      <div className={styles.search}>
        <BsSearch />
        <form className={styles.searchForm} onSubmit={handleSubmit}>
          <input
            type="text"
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Busque por T-shirts e croppeds"
          />
        </form>
      </div>

      <ul className={styles.navLinks}>
        {auth ? (
          <>
            <li>
              <NavLink to="/">
                <BsHouseDoorFill />
              </NavLink>
            </li>
            {user && (
              <li>
                <NavLink to={`/users/${user._id}`}>
                  <BsFillCameraFill /> {/*Ver o que está postado*/}
                </NavLink>
              </li>
            )}
            <li>
              <NavLink to="/profile">
                <BsFillPersonFill /> {/*Modificar dados do perfil*/}
              </NavLink>
            </li>
            {user && (
              <li>
                <NavLink to={`/users/${user._id}/add`}>
                  <BsPlus />
                </NavLink>
              </li>
            )}
            <li>
              <span onClick={handleLogout}>Sair</span>
            </li>
          </>
        ) : (
          <>
            <li>
              <NavLink to="/login">Inicio</NavLink>
            </li>
            <li>
              <NavLink to="/Register">Contatos</NavLink>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
