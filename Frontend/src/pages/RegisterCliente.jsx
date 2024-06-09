import React, { useState } from "react";
import { useAuth } from "../AuthProvider";
import Navbar from "../components/NavBar";
import '../styles/Registers.css';

const RegisterCliente = () => {
    const [cliente, setCliente] = useState({
        cedula: "",
        nombre: "",
        apellidos: "",
        direccion: "",
        barrio: "",
        correo: "",
        telefono: "",
        nombre_usuario: "",
        contrasena: "",
    });
    const [mensaje, setMensaje] = useState("");
    const auth = useAuth();

    const handleSubmitEvent = async (e) => {
        e.preventDefault();

        if (cliente.cedula.trim() !== "" && cliente.nombre.trim() !== "" && cliente.apellidos.trim() !== "" && cliente.direccion.trim() !== "" &&
            cliente.barrio.trim() !== "" && cliente.correo.trim() !== "" && cliente.telefono.trim() !== "" && cliente.nombre_usuario.trim() !== ""
            && cliente.contrasena.trim() !== "") {

            try {
                const response = await fetch("http://localhost:3000/cliente", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${auth.token}`,
                    },
                    body: JSON.stringify(cliente),
                });
                const data = await response.json();
                if (response.ok) {
                    setMensaje(data.message);
                    setCliente({
                        cedula: "",
                        nombre: "",
                        apellidos: "",
                        direccion: "",
                        barrio: "",
                        correo: "",
                        telefono: "",
                        nombre_usuario: "",
                        contrasena: ""
                    });
                } else {
                    setMensaje(data.message || "Error al registrar el Cliente");
                }
            } catch (error) {
                console.error("Error al registrar el Cliente:", error.message);
                setMensaje("Error de conexión");
            }
        } else {
            setMensaje("Todos los campos son obligatorios");
        }
    };

    const handleInput = (e) => {
        const { name, value } = e.target;
        setCliente((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    return (
        <div>
            <Navbar />
            <div className="backgroundRCli">
                <div className="containerRCli">
                    <div id="mensaje">{mensaje}</div>
                    <h2 className="tituloU-C">Registrar Cliente</h2>
                    <form id="datos" onSubmit={handleSubmitEvent}>
                        <div className="form_controlRU">
                            <label htmlFor="cedula">Cédula:</label>
                            <input
                                className="inputU"
                                type="text"
                                id="cedula"
                                name="cedula"
                                value={cliente.cedula}
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
                                    value={cliente.nombre}
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
                                    value={cliente.apellidos}
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
                                    value={cliente.direccion}
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
                                    value={cliente.barrio}
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
                                    value={cliente.correo}
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
                                    value={cliente.telefono}
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
                                    value={cliente.nombre_usuario}
                                    onChange={handleInput}
                                />
                            </div>
                            <div className="form_controlRU">
                                <label htmlFor="contrasena">Contraseña:</label>
                                <input
                                    className="inputUCli"
                                    type="password"
                                    id="contrasena"
                                    name="contrasena"
                                    value={cliente.contrasena}
                                    onChange={handleInput}
                                />
                            </div>
                        </div>
                        <button className="btn-submitRM">Registrar Usuario</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default RegisterCliente;
