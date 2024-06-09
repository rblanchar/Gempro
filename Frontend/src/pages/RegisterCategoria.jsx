import React, { useState } from "react";
import { useAuth } from "../AuthProvider";
import Navbar from "../components/NavBar";
import '../styles/Registers.css';

const RegisterCategoria = () => {
    const [categoria, setcategoria] = useState({ nombre: "" });
    const [mensaje, setMensaje] = useState("");
    const auth = useAuth();

    const handleSubmitEvent = async (e) => {
        e.preventDefault();
        if (categoria.nombre.trim() !== "") {
            try {
                const response = await fetch("http://localhost:3000/categoria", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${auth.token}`,
                    },
                    body: JSON.stringify(categoria),
                });
                const data = await response.json();
                if (response.ok) {
                    setMensaje(data.message);
                    setcategoria({ nombre: "" });
                } else {
                    setMensaje(data.message || "Error al registrar la Categoria");
                }
            } catch (error) {
                console.error("Error al registrar la Categoria:", error.message);
                setMensaje("Error de conexión");
            }
        } else {
            setMensaje("El nombre de la Categoria es obligatorio");
        }
    };

    const handleInput = (e) => {
        const { name, value } = e.target;
        setcategoria((prev) => ({
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
                    <h2>Registro Categoria de Productos</h2>
                    <form id="datos" onSubmit={handleSubmitEvent}>
                        <div className="form_controlRM">
                            <label htmlFor="categoria-name">Nombre de la Categoria:</label>
                            <input
                                type="text"
                                id="categoria-name"
                                name="nombre"
                                value={categoria.nombre}
                                onChange={handleInput}
                            />
                        </div>                      
                        <button className="btn-submitRM">Registrar Tipo de Categoria</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default RegisterCategoria;
