import "./App.css";

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// Hooks
import { useAuth } from "./hooks/useAuth";

// Paginas
import Home from "../src/pages/Store/Home/Home";
import EditProfile from "../src/pages/Adm/EditProfile/EditProfile";
import Profile from "../src/pages/Adm/Profile/Profile";
import Login from "../src/pages/Adm/Auth/Login";
import Register from "../src/pages/Adm/Auth/Register";
import Product from "../src/pages/Store/Product/Product";
import Search from "../src/pages/Store/Search/Search";
import UnavailableProducts from "../src/pages/Adm/UnavailableProducts/UnavailableProducts";
import AddProduct from "../src/pages/Adm/AddProduct/AddProduct";
import EditProduct from "../src/pages/Adm/EditProduct/EditProduct";

// Componentes
import Navbar from "../src/components/Navbar/Navbar";
import Footer from "../src/components/Footer/Footer";

function App() {
  const { auth, loading } = useAuth();

  if (loading) {
    return <p>Carregando...</p>;
  }

  return (
    <div className="App">
      <BrowserRouter>
        {/* <Navbar /> */}
        <div className="p-16">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path="/profile"
              element={auth ? <EditProfile /> : <Navigate to="/" />}
            />
            <Route path="/users/:id" element={<Profile />} />
            <Route
              path="/users/:id/unavailable"
              element={auth ? <UnavailableProducts /> : <Navigate to="/" />}
            />
            <Route
              path="/users/:id/add"
              element={auth ? <AddProduct /> : <Navigate to="/" />}
            />
            <Route
              path="/products/:id/edit"
              element={auth ? <EditProduct /> : <Navigate to="/" />}
            />
            <Route
              path="/login"
              element={!auth ? <Login /> : <Navigate to="/" />}
            />
            <Route
              path="/register"
              element={!auth ? <Register /> : <Navigate to="/" />}
            />
            <Route path="/search" element={<Search />} />
            <Route path="/products/:id" element={<Product />} />
          </Routes>
        </div>
        {/* <Footer /> */}
      </BrowserRouter>
    </div>
  );
}

export default App;
