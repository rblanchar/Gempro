import { useState } from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../AuthProvider";
import Navbar from "../components/NavBar";
import "../styles/Login.css";

const Login = () => {
  const [input, setInput] = useState({
    username: "",
    password: "",
  });
  const [mensaje, setMensaje] = useState("");
  const { loginAction } = useAuth();

  const handleSubmitEvent = (e) => {
    e.preventDefault();
    if (input.username !== "" && input.password !== "") {
      setMensaje("Usuario y contraseña incorrectos");
      loginAction(input);
      return;
    }
    alert("El usuario y la contraseña son obligatorios");
  };

  const handleInput = (e) => {
    const { name, value } = e.target;
    setInput((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div>
      <Navbar />
      <div className="backgroundLG">
        <div className="login-containerLG">
          <div id="mensaje">{mensaje}</div>
          <h2>Inicio de Sesión</h2>
          <form id="datos" onSubmit={handleSubmitEvent}>
            <div className="form_controlLG">
              <label htmlFor="user-name"></label>
              <input
                type="text"
                id="user-name"
                name="username"
                aria-describedby="user-name"
                aria-invalid="false"
                placeholder="Usuario"
                onChange={handleInput}
              />
              <div id="user-name" className="sr-onlyLG"></div>
            </div>
            <div className="form_controlLG">
              <label htmlFor="password"></label>
              <input
                type="password"
                id="password"
                name="password"
                aria-describedby="user-password"
                aria-invalid="false"
                placeholder="Contraseña"
                onChange={handleInput}
              />
              <div id="user-password" className="sr-onlyLG"></div>
            </div>
            <div className="registrarse">
              ¿Aún no tienes una cuenta?
              <NavLink to="/register/cliente" className="enlace">
                <span className="negrita">  Registrarse</span>
              </NavLink>
            </div>
            <button className="btn-submitLG">Iniciar sesión</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
