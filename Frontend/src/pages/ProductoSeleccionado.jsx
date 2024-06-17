import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "../components/NavBar";
import { useCarrito } from "../components/CarritoContext";
import "../styles/Products.css";

const ProductoSeleccionado = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { idProduct, productName, imageUrl, costo, cantidad, margen_ganancia } = location.state || {};

  // Estado local para la cantidad seleccionada
  const [cantidadSeleccionada, setCantidadSeleccionada] = useState(1);

  // Obtener funciones del contexto del carrito
  const { agregarAlCarrito } = useCarrito();

  // Calcular el valor unitario con el margen de ganancia
  const valorUnitario = (costo * margen_ganancia) + costo;
  const vrTotal2 = valorUnitario * cantidadSeleccionada;

  // Cargar el producto seleccionado cuando el componente se monta
  const productoSeleccionado = {
    idProduct,
    productName,
    imageUrl,
    costo,
    cantidad,
    margen_ganancia,
    vrTotal: vrTotal2, // Asegúrate de usar el valor calculado actual
  };

  const agregarProducto = () => {
    if (!productoSeleccionado) return;
    agregarAlCarrito({ ...productoSeleccionado, cantidad: cantidadSeleccionada });
    navigate(-1);
  };

  return (
    <div>
      <Navbar />
      <div className="prodSeleccionadoContainer">
        <h2 className="tituloPrdSel">
          {productName ? productName : "No se seleccionó ningún producto"}
        </h2>
        {idProduct && imageUrl ? (
          <div>
            <img
              className="imagenProdSelecionado"
              src={imageUrl}
              alt={productName}
            />
            <div className="cantidadProdSel" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '10px' }}>
              <label style={{ marginRight: '20px', margin: '0px 20px 0px 0px' }}>Cantidad:</label>
              <select value={cantidadSeleccionada} onChange={(e) => setCantidadSeleccionada(parseInt(e.target.value))}>
                {[...Array(cantidad).keys()].map((num) => (
                  <option key={num + 1} value={num + 1}>{num + 1}</option>
                ))}
              </select>
            </div>

            <div className="costoProdSel">
              Valor Unitario: $ {valorUnitario.toLocaleString('es-ES')}
            </div>

            <div className="costoProdSel">
              Valor Total: $ {vrTotal2.toLocaleString('es-ES')}
            </div>
            <button className="btn-submitImgSel" onClick={agregarProducto}>
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
