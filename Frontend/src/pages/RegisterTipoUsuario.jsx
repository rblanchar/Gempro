import React, { useState } from "react";
import { useAuth } from "../AuthProvider";
import Navbar from "../components/NavBar";
import '../styles/Registers.css';

const RegisterTipoUsuario = () => {
    const [tipoUsuario, settipoUsuario] = useState({ nombre: "" });
    const [mensaje, setMensaje] = useState("");
    const auth = useAuth();

    const handleSubmitEvent = async (e) => {
        e.preventDefault();
        if (tipoUsuario.nombre.trim() !== "") {
            try {
                const response = await fetch("http://localhost:3000/tipo_usuario", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${auth.token}`,
                    },
                    body: JSON.stringify(tipoUsuario),
                });
                const data = await response.json();
                if (response.ok) {
                    setMensaje(data.message);
                    settipoUsuario({ nombre: "" });
                } else {
                    setMensaje(data.message || "Error al registrar el tipoUsuario");
                }
            } catch (error) {
                console.error("Error al registrar el settipoUsuario:", error.message);
                setMensaje("Error de conexión");
            }
        } else {
            setMensaje("El nombre del TipoUsuario es obligatorio");
        }
    };

    const handleInput = (e) => {
        const { name, value } = e.target;
        settipoUsuario((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    return (
        <div>
            <Navbar />
            <div className="backgroundRM">
                <div className="containerRM">
                <div id="mensaje">{mensaje}</div>
                    <h2>Registro Tipo de Usuarios</h2>
                    <form id="datos" onSubmit={handleSubmitEvent}>
                        <div className="form_controlRM">
                            <label htmlFor="tipoUsuario-name">Nombre Tipo de Usuario:</label>
                            <input
                                type="text"
                                id="tipoUsuario-name"
                                name="nombre"
                                value={tipoUsuario.nombre}
                                onChange={handleInput}
                            />
                        </div>                        
                        <button className="btn-submitRM">Registrar Tipo de Usuario</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default RegisterTipoUsuario;
