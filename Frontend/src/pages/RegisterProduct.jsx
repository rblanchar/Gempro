import React, { useState, useEffect } from "react";
import { useAuth } from "../AuthProvider";
import Navbar from "../components/NavBar";
import "../styles/Registers.css";

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
  const [mensaje, setMensaje] = useState("");
  const auth = useAuth();

  useEffect(() => {
    const fetchCategorias = async () => {
      try {
        const response = await fetch("http://localhost:3000/categoria", {
          headers: {
            Authorization: `Bearer ${auth.token}`,
          },
        });
        if (response.ok) {
          const data = await response.json();
          setCategorias(data); // Asignar las categorías obtenidas del backend al estado local
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
          <div id="mensaje">{mensaje}</div>
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
              <select
                id="id_categoria"
                name="id_categoria"
                value={producto.id_categoria}
                onChange={handleInput}
              >
                <option value="">Seleccionar categoría</option>
                {categorias.map((categoria) => (
                  <option key={categoria.id_categoria} value={categoria.id_categoria}>
                    {categoria.descripcion}
                  </option>
                ))}
              </select>
            </div>
            <div className="form_controlRM">
              <label htmlFor="id_material">Material:</label>
              <input
                type="text"
                id="id_material"
                name="id_material"
                value={producto.id_material}
                onChange={handleInput}
              />
            </div>
            <button className="btn-submitRM">Registrar Producto</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterProduct;
