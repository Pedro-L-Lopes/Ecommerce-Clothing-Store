import "./App.css";

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// Hooks
import { useAuth } from "./hooks/useAuth";

// Paginas
import Home from "./pages/Home/Home";
import EditProfile from "./pages/EditProfile/EditProfile";
import Profile from "./pages/Profile/Profile";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import Product from "./pages/Product/Product";
import Search from "./pages/Search/Search";
import UnavailableProducts from "./pages/UnavailableProducts/UnavailableProducts";

// Componentes
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import AddProduct from "./pages/AddProduct/AddProduct";
import EditProduct from "./pages/EditProduct/EditProduct";

function App() {
  const { auth, loading } = useAuth();

  if (loading) {
    return <p>Carregando...</p>;
  }

  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <div className="container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path="/profile"
              element={auth ? <EditProfile /> : <Navigate to="/" />}
            />
            <Route path="/users/:id" element={<Profile />} />
            <Route
              path="/users/:id/unavailable"
              element={auth ? <UnavailableProducts /> : (Navigate = "/")}
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
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
