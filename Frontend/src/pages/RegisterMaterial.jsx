import React, { useState } from "react";
import { useAuth } from "../AuthProvider";
import Navbar from "../components/NavBar";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import '../styles/Registers.css';

const RegisterMaterial = () => {
    const [material, setMaterial] = useState({ nombre: "" });
    const [mensaje, setMensaje] = useState("");
    const navigate = useNavigate();
    const auth = useAuth();

    const handleSubmitEvent = async (e) => {
        e.preventDefault();
        if (material.nombre.trim() !== "") {
            try {
                const response = await fetch("http://localhost:3000/material", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${auth.token}`,
                    },
                    body: JSON.stringify(material),
                });
                const data = await response.json();
                if (response.ok) {
                    setMensaje(data.message);
                    setMaterial({ nombre: "" });

                    Swal.fire({
                        //title: "Material registrado con Éxito!",
                        text: "Material registrado con Éxito!",
                        icon: "success",
                        confirmButtonText: "OK"
                    }).then(() => {
                        navigate("/register/material");
                    });

                } else {
                    setMensaje(data.message || "Error al registrar el material");
                }
            } catch (error) {
                console.error("Error al registrar el material:", error.message);
                setMensaje("Error de conexión");
            }
        } else {
            setMensaje("El nombre del material es obligatorio");
        }
    };

    const handleInput = (e) => {
        const { name, value } = e.target;
        setMaterial((prev) => ({
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
                    <h2>Registro de Materiales</h2>
                    <form id="datos" onSubmit={handleSubmitEvent}>
                        <div className="form_controlRM">
                            <label htmlFor="material-name">Nombre del Material:</label>
                            <input
                                type="text"
                                id="material-name"
                                name="nombre"
                                value={material.nombre}
                                onChange={handleInput}
                            />
                        </div>
                        <button className="btn-submitRM">Registrar Material</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default RegisterMaterial;
