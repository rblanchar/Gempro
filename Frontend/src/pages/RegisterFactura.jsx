import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useAuth } from "../AuthProvider";
import Navbar from "../components/NavBar";
import '../styles/Registers.css';

const RegisterFactura = () => {
    const location = useLocation();
    const total = location.state?.total || 0;

    const [factura, setFactura] = useState({
        id_cliente: "",
        id_usuario: "",
        subtotal: total,
        total_pagar: total
    });
/* justo aqui */
    const [mensaje, setMensaje] = useState("");
    const auth = useAuth();
    console.log("ojo" + auth.user);
    const handleSubmitEvent = async (e) => {
        e.preventDefault();

        if (factura.id_cliente.trim() !== "" && factura.id_usuario.trim() !== "") {

            try {
                const response = await fetch("http://localhost:3000/factura", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${auth.token}`,
                    },
                    body: JSON.stringify(factura),
                });
                const data = await response.json();
                if (response.ok) {
                    setMensaje(data.message);
                    setFactura({
                        id_cliente: "",
                        id_usuario: "",
                        subtotal: "",
                        total_pagar: ""
                    });
                } else {
                    setMensaje(data.message || "Error al registrar la factura");
                }
            } catch (error) {
                console.error("Error al registrar la factura:", error.message);
                setMensaje("Error de conexión");
            }
        } else {
            setMensaje("Todos los campos son obligatorios");
        }
    };

    const handleInput = (e) => {
        const { name, value } = e.target;
        setFactura((prev) => ({
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
                    <h2 className="tituloU-C">Registrar Factura</h2>
                    <form id="datos" onSubmit={handleSubmitEvent}>
                        <div className="form_controlRU">
                            <label htmlFor="id_cliente">ID DEL CLIENTE:</label>
                            <input
                                className="inputU"
                                type="number"
                                id="id_cliente"
                                name="id_cliente"
                                value={factura.id_cliente}
                                onChange={handleInput}
                            />
                        </div>
                        <div className="two-column-container">
                            <div className="form_controlRU">
                                <label htmlFor="id_usuario">ID DEL USUARIO</label>
                                <input
                                    className="inputU"
                                    type="number"
                                    id="id_usuario"
                                    name="id_usuario"
                                    value={factura.id_usuario}
                                    onChange={handleInput}
                                />
                            </div>
                            <div className="form_controlRU">
                                <label htmlFor="subtotal">SUBTOTAL</label>
                                <input
                                    className="inputU"
                                    type="number"
                                    id="subtotal"
                                    name="subtotal"
                                    value={factura.subtotal}
                                    onChange={handleInput}
                                    readOnly
                                />
                            </div>
                            <div className="form_controlRU">
                                <label htmlFor="total_pagar">TOTAL</label>
                                <input
                                    className="inputU"
                                    type="number"
                                    id="total_pagar"
                                    name="total_pagar"
                                    value={factura.total_pagar}
                                    onChange={handleInput}
                                    readOnly
                                />
                            </div>
                        </div>
                        <button className="btn-submitRM">Realizar Compra</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default RegisterFactura;
