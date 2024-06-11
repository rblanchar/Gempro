import React, { useEffect, useState } from "react";
import Navbar from "../components/NavBar";
import { useAuth } from "../AuthProvider";
import { useNavigate } from "react-router-dom";
import '../styles/Products.css';

const ProductosRelojesDeportivos = () => {
  const navigate = useNavigate();
  const [productos, setProductos] = useState([]);
  const auth = useAuth();

  useEffect(() => {
    fetch("http://localhost:3000/producto", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": auth.token,
      },
    })
      .then((res) => res.json())
      .then((datos) => {
        const productosFiltrados = datos.data.filter(producto => producto.ID_CATEGORIA === '205');
        setProductos(productosFiltrados);
      })
      .catch((error) => console.error("Error fetching products:", error));
  }, [auth.token]);

  const handleImageClick = (className, productName, imageUrl, costo) => {
    navigate("/productoSeleccionado", {
      state: { className, productName, imageUrl, costo }
    });
  };

  return (
    <div>
      <Navbar />
      <h3 className="titlePRODUCTOS">RELOJES DEPORTIVOS</h3>
      <div className="containerPRODCUTOS">
        {productos.map((producto) => (
          <div
            key={producto.ID_PRODUCTO}
            className="opcionPROD"
            onClick={() => handleImageClick(`${producto.ID_PRODUCTO}`, producto.DESCRIPCION, `${process.env.REACT_APP_URL_IMG}${producto.IMAGEN}`, producto.COSTO)}
          >
            <img 
              className="imagenProdSelecionado" 
              src={`${process.env.REACT_APP_URL_IMG}${producto.IMAGEN}`} 
              alt={producto.DESCRIPCION} 
            />
            <div className="productoTexto">{producto.DESCRIPCION}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductosRelojesDeportivos;
