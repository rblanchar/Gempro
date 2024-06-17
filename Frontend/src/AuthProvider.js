import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCarrito } from "./components/CarritoContext";

const AuthContext = createContext();

const loginU = async function (data) {
  const usuario = { nombre_usuario: data.username, contrasena: data.password };
  const response = await fetch("http://localhost:3000/usuario/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(usuario),
  });
  return response.json();
};

const loginC = async function (data) {
  const cliente = { nombre_usuario: data.username, contrasena: data.password };
  const response = await fetch("http://localhost:3000/cliente/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(cliente),
  });
  return response.json();
};

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("site") || "");
  const navigate = useNavigate();
  const { limpiarCarrito } = useCarrito();

  const loginAction = async (data) => {
    limpiarCarrito();
    try {
      let response = await loginU(data);
      if (response && response.usuario) {
        setUser({ ...response.usuario, tipo: "usuario" });
        setToken(response.token);
        localStorage.setItem("site", response.token);
        console.log("Usuario logeado:", response.usuario);
        navigate("/dashboard");
        return;
      }

      response = await loginC(data);
      if (response && response.cliente) {
        setUser({ ...response.cliente, tipo: "cliente" });
        setToken(response.token);
        localStorage.setItem("site", response.token);
        console.log("Cliente logeado:", response.cliente);
        navigate("/dashboard");
        return;
      }

      throw new Error(response.error || "Error desconocido");
    } catch (error) {
      console.error("Error al iniciar sesión:", error.message);
    }
  };

  const logOut = () => {
    setUser(null);
    setToken("");
    localStorage.removeItem("site");
    limpiarCarrito();
    navigate("/dashboard");
  };

  return (
    <AuthContext.Provider value={{ user, token, loginAction, logOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

// Hook personalizado
export const useAuth = () => {
  return useContext(AuthContext);
};
