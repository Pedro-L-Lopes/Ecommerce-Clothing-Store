import "./App.css";

import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";

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
import AddProduct from "../src/pages/Adm/AddProduct/AddProduct";
import EditProduct from "../src/pages/Adm/EditProduct/EditProduct";
import Cart from "./pages/Store/Cart/Cart";
import AllProducts from "./pages/Store/AllProducts/AllProducts";
import ClientForm from "./pages/Store/ClientForm/ClientForm";
import Payment from "./pages/Store/Payment/Payment";
import Thanks from "./pages/Store/Thanks/Thanks";
import Orders from "./pages/Adm/Orders/Orders";
import Order from "./pages/Adm/Order/Order";

function App() {
  const { auth, loading } = useAuth();

  if (loading) {
    return <p>Carregando...</p>;
  }

  return (
    <div className={`app`}>
      <BrowserRouter>
        <div className="">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path="/profile"
              element={auth ? <EditProfile /> : <Navigate to="/" />}
            />
            <Route path="/users/:id" element={<Profile />} />
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
            <Route path="/orders/" element={<Orders />} />
            <Route path="/orders/:id" element={<Order />} />

            <Route path="/cart" element={<Cart />} />
            <Route path="/allproducts" element={<AllProducts />} />
            <Route path="/fldcpcop1" element={<ClientForm />} />
            <Route path="/payment/:id" element={<Payment />} />
            <Route path="/thanks" element={<Thanks />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
