import styles from "./Navbar.module.css";

// Components
import { NavLink, Link } from "react-router-dom";
import { BsSearch } from "react-icons/bs";

// Hooks
import { useState, useEffect } from "react";
import { useAuth } from "../../hooks/useAuth";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import logo from "../../images/logo.png";
import Sidebar from "../Sidebar/Sidebar";

const Navbar = () => {
  const { auth } = useAuth();
  const { user } = useSelector((state) => state.auth);

  const [query, setQuery] = useState("");

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (query) {
      return navigate(`/search?q=${query}`);
    }
  };

  return (
    <>
      {auth && user ? (
        <Sidebar user={user} />
      ) : (
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
            <li>
              <NavLink to="/login">Inicio</NavLink>
            </li>
            <li>
              <NavLink to="/Register">Contatos</NavLink>
            </li>
          </ul>
        </nav>
      )}
    </>
  );
};

export default Navbar;
