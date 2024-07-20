import React, { useState, useEffect } from "react";
import { useAuth } from "../AuthProvider";
import Navbar from "../components/NavBar";
import "../styles/Registers.css";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const RegisterProduct = () => {
    const [producto, setProducto] = useState({
        descripcion: "",
        costo: "",
        peso: "",
        margen_ganancia: "",
        cantidad: "",
        id_categoria: "",
        id_material: "",
    });
    const [categorias, setCategorias] = useState([]);
    const [materiales, setMateriales] = useState([]);
    const navigate = useNavigate();

    const [mensaje, setMensaje] = useState("");
    const auth = useAuth();

    useEffect(() => {
        const fetchCategorias = async () => {
            try {
                const response = await fetch("http://localhost:3000/categoria", {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": auth.token,
                    },
                });
                if (response.ok) {
                    const data = await response.json();
                    setCategorias(data.data);
                } else {
                    throw new Error("Error al cargar las categorías");
                }
            } catch (error) {
                console.error("Error al obtener las categorías:", error.message);
                setMensaje("Error al cargar las categorías");
            }
        };

        fetchCategorias();
    }, [auth.token]);

    useEffect(() => {
        const fetchMateriales = async () => {
            try {
                const response = await fetch("http://localhost:3000/material", {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": auth.token,
                    },
                });
                if (response.ok) {
                    const data = await response.json();
                    setMateriales(data.data);

                    

                } else {
                    throw new Error("Error al cargar los materiales");
                }
            } catch (error) {
                console.error("Error al obtener los materiales:", error.message);
                setMensaje("Error al cargar los materiales");
            }
        };

        fetchMateriales();
    }, [auth.token]);

    const handleSubmitEvent = async (e) => {
        e.preventDefault();

        if (
            producto.descripcion.trim() !== "" &&
            producto.costo.trim() !== "" &&
            producto.peso.trim() !== "" &&
            producto.margen_ganancia.trim() !== "" &&
            producto.cantidad.trim() !== "" &&
            producto.id_categoria.trim() !== "" &&
            producto.id_material.trim() !== ""
        ) {
            try {
                const response = await fetch("http://localhost:3000/producto", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${auth.token}`,
                    },
                    body: JSON.stringify(producto),
                });
                const data = await response.json();
                if (response.ok) {
                    setMensaje(data.message);
                    setProducto({
                        descripcion: "",
                        costo: "",
                        peso: "",
                        margen_ganancia: "",
                        cantidad: "",
                        id_categoria: "",
                        id_material: "",

                    });
                    Swal.fire({
                        //title: "Material registrado con Éxito!",
                        text: "Producto registrado con Éxito!",
                        icon: "success",
                        confirmButtonText: "OK"
                    }).then(() => {
                        navigate("/register/producto");
                    });
                } else {
                    setMensaje(data.message || "Error al registrar el producto");
                }
            } catch (error) {
                console.error("Error al registrar el producto:", error.message);
                setMensaje("Error de conexión");
            }
        } else {
            setMensaje("Todos los campos son obligatorios");
        }
    };

    const handleInput = (e) => {
        const { name, value } = e.target;
        setProducto((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    return (
        <div>
            <Navbar />
            <div className="backgroundRP">
                <div className="containerRM">
                    {/*<div id="mensaje">{mensaje}</div>*/}
                    <h2>Registrar Producto</h2>
                    <form id="datos" onSubmit={handleSubmitEvent}>
                        <div className="form_controlRM">
                            <label htmlFor="descripcion">Descripción:</label>
                            <input
                                type="text"
                                id="descripcion"
                                name="descripcion"
                                value={producto.descripcion}
                                onChange={handleInput}
                            />
                        </div>
                        <div className="form_controlRM">
                            <label htmlFor="costo">Costo:</label>
                            <input
                                type="number"
                                id="costo"
                                name="costo"
                                value={producto.costo}
                                onChange={handleInput}
                            />
                        </div>
                        <div className="form_controlRM">
                            <label htmlFor="peso">Peso:</label>
                            <input
                                type="number"
                                id="peso"
                                name="peso"
                                value={producto.peso}
                                onChange={handleInput}
                                step="any"
                                min="0"
                            />
                        </div>
                        <div className="form_controlRM">
                            <label htmlFor="margen_ganancia">Margen de Ganancia:</label>
                            <input
                                type="number"
                                id="margen_ganancia"
                                name="margen_ganancia"
                                value={producto.margen_ganancia}
                                onChange={handleInput}
                                step="any"
                                min="0"
                            />
                        </div>
                        <div className="form_controlRM">
                            <label htmlFor="cantidad">Cantidad:</label>
                            <input
                                type="number"
                                id="cantidad"
                                name="cantidad"
                                value={producto.cantidad}
                                onChange={handleInput}
                            />
                        </div>
                        <div className="form_controlRM">
                            <label htmlFor="id_categoria">Categoría:</label>
                            <div style={{ width: '100%' }}>
                                <select
                                    id="id_categoria"
                                    name="id_categoria"
                                    className="combobox"
                                    value={producto.id_categoria}
                                    onChange={handleInput}
                                >
                                    <option value="">Seleccionar categoría</option>
                                    {categorias.map((categoria) => (
                                        <option key={categoria.ID_CATEGORIA} value={categoria.ID_CATEGORIA}>
                                            {categoria.NOMBRE}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        <div className="form_controlRM">
                            <label htmlFor="id_material">Material:</label>
                            <div style={{ width: '100%' }}>
                                <select
                                    id="id_material"
                                    name="id_material"
                                    className="combobox"
                                    value={producto.id_material}
                                    onChange={handleInput}
                                >
                                    <option value="">Seleccionar material</option>
                                    {materiales.map((material) => (
                                        <option key={material.ID_MATERIAL} value={material.ID_MATERIAL}>
                                            {material.NOMBRE}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        <button className="btn-submitRM">Registrar Producto</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default RegisterProduct;
