import { useState } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useNavigate,
} from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Cadastro from "./pages/Cadastro";
import Servicos from "./pages/Servicos";
import Agendamento from "./pages/Agendamento";

function AppRoutes() {
  const [token, setToken] = useState(() => localStorage.getItem("token"));
  const navigate = useNavigate();

  function handleLogin(tokenRecebido) {
    localStorage.setItem("token", tokenRecebido);
    setToken(tokenRecebido);
    navigate("/agendamento");
  }

  function handleLogout() {
    localStorage.removeItem("token");
    setToken(null);
    navigate("/login");
  }

  return (
    <Routes>
      <Route path="/" element={<Home />} />

      <Route
        path="/login"
        element={<Login onLogin={handleLogin} />}
      />

      <Route path="/cadastro" element={<Cadastro />} />

      <Route
        path="/servicos"
        element={
          token ? (
            <Servicos onLogout={handleLogout} />
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />

      <Route
        path="/agendamento"
        element={
          token ? (
            <Agendamento onLogout={handleLogout} />
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}

export default App;