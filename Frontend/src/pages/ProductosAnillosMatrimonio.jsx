import React from "react";
import Navbar from "../components/NavBar";
import { useNavigate } from "react-router-dom";
import '../styles/Products.css';

const ProductosAnillosMatrimonio = () => {
  const navigate = useNavigate();

  const handleImageClick = (className) => {
    navigate("/productoSeleccionado", {
      state: { className }
    });
  };

  return (
    <div>
      <Navbar />
      <h3 className="titlePRODUCTOS">ANILLOS DE MATRIMONIO</h3>
      <div className="containerPRODCUTOS">
        <div className="opcionPROD anilloM1" onClick={() => handleImageClick('anilloM1')}>
          <div className="productoTexto">RELOJ 111111</div>
        </div>
        <div className="opcionPROD anilloM2" onClick={() => handleImageClick('anilloM2')}>
          <div className="productoTexto">RELOJ 222222</div>
        </div>
        <div className="opcionPROD anilloM3" onClick={() => handleImageClick('anilloM3')}>
          <div className="productoTexto">RELOJ 333333</div>
        </div>
        <div className="opcionPROD anilloM4" onClick={() => handleImageClick('anilloM4')}>
          <div className="productoTexto">RELOJ 44444</div>
        </div>
        <div className="opcionPROD anilloM5" onClick={() => handleImageClick('anilloM5')}>
          <div className="productoTexto">RELOJ 5555555</div>
        </div>
        <div className="opcionPROD anilloM6" onClick={() => handleImageClick('anilloM6')}>
          <div className="productoTexto">RELOJ 666666</div>
        </div>
        <div className="opcionPROD anilloM7" onClick={() => handleImageClick('anilloM7')}>
          <div className="productoTexto">RELOJ 333333</div>
        </div>
        <div className="opcionPROD anilloM8" onClick={() => handleImageClick('anilloM8')}>
          <div className="productoTexto">RELOJ 44444</div>
        </div>
      </div>
    </div>
  );
};

export default ProductosAnillosMatrimonio;
