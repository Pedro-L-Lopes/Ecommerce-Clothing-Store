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

// Componentes
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

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
            <Route
              path="/users/:id"
              element={auth ? <Profile /> : <Navigate to="/" />}
            />
            <Route
              path="/login"
              element={!auth ? <Login /> : <Navigate to="/" />}
            />
            <Route
              path="/register"
              element={!auth ? <Register /> : <Navigate to="/" />}
            />
          </Routes>
        </div>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
