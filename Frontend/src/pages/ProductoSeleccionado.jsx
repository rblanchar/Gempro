import React from "react";
import { useLocation } from "react-router-dom";
import '../styles/Products.css'; 


const ProductoSeleccionado = () => {
  const location = useLocation();
  const { className } = location.state || {};

  return (
    <div>
      <h2>Producto Seleccionado</h2>
      {className ? (
        <div className={`imagenProdSelecionado ${className}`}></div>
      ) : (
        <p>No se seleccionó ninguna imagen.</p>
      )}
    </div>
  );
};

export default ProductoSeleccionado;
