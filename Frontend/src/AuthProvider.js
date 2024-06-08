import { useContext, createContext, useState } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

const login = async function (data) {
  const usuario = {nombre_usuario: data.username, contrasena: data.password};
  const response = await fetch("http://localhost:3000/usuario/login", {
    method: "POST",
    mode: "cors",
    cache: "no-cache", 
    credentials: "same-origin",  
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET,POST,OPTIONS,DELETE,PUT",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(usuario),
  });
   return response.json();
};


const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("site") || "");
  const navigate = useNavigate();

  const loginAction = (data) => {
    let mensaje = "";
    const message = login(data);
    message.then((e) => {
      if (e.mensaje) {
        mensaje = e.mensaje;
        return mensaje;
      } else {
        setUser(data.username);
        setToken(data.password);
        localStorage.setItem("site", data.password);
        navigate("dashboard");
      }
    })};
  
  /*
  const loginAction = (data) => {
    if (data.username === "admin" && data.password === "12345") {
      setUser(data.username);
      setToken(data.password);
      localStorage.setItem("site", data.password);
      navigate("/dashboard");
    }
    throw Error("Usuario no encontrado");
  };
*/

  const logOut = () => {
    setUser(null);
    setToken("");
    localStorage.removeItem("site");
    navigate("/login");
  };

  return (
    <AuthContext.Provider value={{ token, user, loginAction, logOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

//Hook personalizado
export const useAuth = () => {
  return useContext(AuthContext);
};