import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "../components/NavBar";
import "../styles/Products.css";

const ProductoSeleccionado = () => {
  const location = useLocation();
  const { className, productName, imageUrl, costo } = location.state || {};

  // Estado local para el producto seleccionado
  const [productoSeleccionado, setProductoSeleccionado] = useState(null);

  // Cargar el producto seleccionado cuando el componente se monta
  useState(() => {
    if (location.state) {
      setProductoSeleccionado({
        className,
        productName,
        imageUrl,
        costo,
      });
    }
  }, [location.state]);

  const agregarAlCarrito = () => {
    if (!productoSeleccionado) return;

    // Obtener el carrito actual del localStorage o inicializarlo como un array vacío
    const carritoActual = JSON.parse(localStorage.getItem("carrito")) || [];

    // Agregar el producto seleccionado al carrito
    carritoActual.push(productoSeleccionado);

    // Guardar el carrito actualizado en el localStorage
    localStorage.setItem("carrito", JSON.stringify(carritoActual));

    // Mostrar un mensaje en la consola (puedes quitar esto en producción)
    console.log(`Agregado al carrito: ${productName}, costo: ${costo}`);
  };

  return (
    <div>
      <Navbar />
      <div className="prodSeleccionadoContainer">
        <h2 className="tituloPrdSel">
          {productName ? productName : "No se seleccionó ningún producto"}
        </h2>
        {className && imageUrl ? (
          <div>
            <img
              className="imagenProdSelecionado"
              src={imageUrl}
              alt={productName}
            />
            <div className="costoProd">${costo}</div>
            <button className="btn-submitImgSel" onClick={agregarAlCarrito}>
              Agregar al Carrito
            </button>
          </div>
        ) : (
          <p>No se seleccionó ninguna imagen.</p>
        )}
      </div>
    </div>
  );
};

export default ProductoSeleccionado;
