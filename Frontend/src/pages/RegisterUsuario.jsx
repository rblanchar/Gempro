import React, { useState } from "react";
import { useAuth } from "../AuthProvider";
import Navbar from "../components/NavBar";
import '../styles/Registers.css';

const RegisterUsuario = () => {
    const [usuario, setUsuario] = useState({
        cedula: "",
        nombre: "",
        apellidos: "",
        direccion: "",
        barrio: "",
        correo: "",
        telefono: "",
        nombre_usuario: "",
        contrasena: "",
        id_tipo: ""
    });
    const [mensaje, setMensaje] = useState("");
    const auth = useAuth();

    const handleSubmitEvent = async (e) => {
        e.preventDefault();

        if (usuario.cedula.trim() !== "" && usuario.nombre.trim() !== "" && usuario.apellidos.trim() !== "" && usuario.direccion.trim() !== "" &&
            usuario.barrio.trim() !== "" && usuario.correo.trim() !== "" && usuario.telefono.trim() !== "" && usuario.nombre_usuario.trim() !== ""
            && usuario.contrasena.trim() !== "" && usuario.id_tipo.trim() !== "") {

            try {
                const response = await fetch("http://localhost:3000/usuario", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${auth.token}`,
                    },
                    body: JSON.stringify(usuario),
                });
                const data = await response.json();
                if (response.ok) {
                    setMensaje(data.message);
                    setUsuario({
                        cedula: "",
                        nombre: "",
                        apellidos: "",
                        direccion: "",
                        barrio: "",
                        correo: "",
                        telefono: "",
                        nombre_usuario: "",
                        contrasena: "",
                        id_tipo: ""
                    });
                } else {
                    setMensaje(data.message || "Error al registrar el Usuario");
                }
            } catch (error) {
                console.error("Error al registrar el Usuario:", error.message);
                setMensaje("Error de conexión");
            }
        } else {
            setMensaje("Todos los campos son obligatorios");
        }
    };

    const handleInput = (e) => {
        const { name, value } = e.target;
        setUsuario((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    return (
        <div>
            <Navbar />
            <div className="backgroundRU">
                <div className="containerRU">
                <div id="mensaje">{mensaje}</div>
                    <h2 className="tituloU-C">Registrar Usuario</h2>
                    <form id="datos" onSubmit={handleSubmitEvent}>
                        <div className="form_controlRU">
                            <label htmlFor="cedula">Cédula:</label>
                            <input
                                className="inputU"
                                type="text"
                                id="cedula"
                                name="cedula"
                                value={usuario.cedula}
                                onChange={handleInput}
                            />
                        </div>
                        <div className="two-column-container">
                            <div className="form_controlRU">
                                <label htmlFor="nombre">Nombre:</label>
                                <input
                                    className="inputU"
                                    type="text"
                                    id="nombre"
                                    name="nombre"
                                    value={usuario.nombre}
                                    onChange={handleInput}
                                />
                            </div>
                            <div className="form_controlRU">
                                <label htmlFor="apellidos">Apellidos:</label>
                                <input
                                    className="inputU"
                                    type="text"
                                    id="apellidos"
                                    name="apellidos"
                                    value={usuario.apellidos}
                                    onChange={handleInput}
                                />
                            </div>
                        </div>
                        <div className="two-column-container">
                            <div className="form_controlRU">
                                <label htmlFor="direccion">Dirección:</label>
                                <input
                                    className="inputU"
                                    type="text"
                                    id="direccion"
                                    name="direccion"
                                    value={usuario.direccion}
                                    onChange={handleInput}
                                />
                            </div>
                            <div className="form_controlRU">
                                <label htmlFor="barrio">Barrio:</label>
                                <input
                                    className="inputU"
                                    type="text"
                                    id="barrio"
                                    name="barrio"
                                    value={usuario.barrio}
                                    onChange={handleInput}
                                />
                            </div>
                        </div>
                        <div className="two-column-container">
                            <div className="form_controlRU">
                                <label htmlFor="correo">Correo:</label>
                                <input
                                    className="inputU"
                                    type="email"
                                    id="correo"
                                    name="correo"
                                    value={usuario.correo}
                                    onChange={handleInput}
                                />
                            </div>
                            <div className="form_controlRU">
                                <label htmlFor="telefono">Teléfono:</label>
                                <input
                                    className="inputU"
                                    type="text"
                                    id="telefono"
                                    name="telefono"
                                    value={usuario.telefono}
                                    onChange={handleInput}
                                />
                            </div>
                        </div>
                        <div className="two-column-container">
                            <div className="form_controlRU">
                                <label htmlFor="nombre_usuario">Nombre de Usuario:</label>
                                <input
                                    className="inputU"
                                    type="text"
                                    id="nombre_usuario"
                                    name="nombre_usuario"
                                    value={usuario.nombre_usuario}
                                    onChange={handleInput}
                                />
                            </div>
                            <div className="form_controlRU">
                                <label htmlFor="contrasena">Contraseña:</label>
                                <input
                                    className="inputU"
                                    type="password"
                                    id="contrasena"
                                    name="contrasena"
                                    value={usuario.contrasena}
                                    onChange={handleInput}
                                />
                            </div>
                        </div>
                        <div className="form_controlRU">
                            <label htmlFor="id_tipo">ID Tipo:</label>
                            <input
                                className="inputUID"
                                type="text"
                                id="id_tipo"
                                name="id_tipo"
                                value={usuario.id_tipo}
                                onChange={handleInput}
                            />
                        </div>
                        <button className="btn-submitRM">Registrar Usuario</button>
                        
                    </form>
                </div>
            </div>
        </div>
    );
};

export default RegisterUsuario;
