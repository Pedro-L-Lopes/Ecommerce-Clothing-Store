import "./Navbar.css";

// Components
import { NavLink, Link } from "react-router-dom";
import {
  BsSearch,
  BsHouseDoorFill,
  BsFillPersonFill,
  BsFillCameraFill,
} from "react-icons/bs";

// Hooks
// import { useState } from "react";
// import { useAuth } from "../hooks/useAuth";
// import { useDispatch, useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";

const Navbar = () => {
  return <nav id="nav">
    <Link to="/">Shop Naw</Link>
    <form>
      <BsSearch />
      <input type="text" />
    </form>
    <ul id="navlinks">
      <NavLink to="/login">Entrar</NavLink>
      <NavLink to="/Register">Cadastrar</NavLink>
    </ul>
  </nav>;
};

export default Navbar;
