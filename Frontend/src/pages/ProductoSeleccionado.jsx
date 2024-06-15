import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "../components/NavBar";
import "../styles/Products.css";

const ProductoSeleccionado = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { idProduct, productName, imageUrl, costo, cantidad, margen_ganancia } = location.state || {};

  // Estado local para el producto seleccionado y cantidad
  const [productoSeleccionado, setProductoSeleccionado] = useState(null);
  const [cantidadSeleccionada, setCantidadSeleccionada] = useState(1);
  const [carritoCount, setCarritoCount] = useState(0);

  // Calcular el valor unitario con el margen de ganancia
  const valorUnitario = (costo * margen_ganancia) + costo;
  const vrTotal2 = valorUnitario * cantidadSeleccionada;

  // Cargar el producto seleccionado cuando el componente se monta
  useEffect(() => {
    if (location.state) {
      setProductoSeleccionado({
        idProduct,
        productName,
        imageUrl,
        costo,
        cantidad,
        margen_ganancia,
        vrTotal: vrTotal2, // Asegúrate de usar el valor calculado actual
      });
    }

    const carritoActual = JSON.parse(localStorage.getItem("carrito")) || [];
    setCarritoCount(carritoActual.length);
  }, [location.state, cantidadSeleccionada, vrTotal2]);

  const agregarAlCarrito = () => {
    if (!productoSeleccionado) return;

    // Obtener el carrito actual del localStorage o inicializarlo como un array vacío
    const carritoActual = JSON.parse(localStorage.getItem("carrito")) || [];

    // Agregar el producto seleccionado al carrito con la cantidad deseada
    carritoActual.push({ ...productoSeleccionado, vrTotal: vrTotal2, cantidad: cantidadSeleccionada });

    // Guardar el carrito actualizado en el localStorage
    localStorage.setItem("carrito", JSON.stringify(carritoActual));
    navigate(-1);

    // Actualizar contador de elementos en el carrito
    setCarritoCount(carritoActual.length);

    // Mostrar un mensaje en la consola (puedes quitar esto en producción)
    // console.log(`Agregado al carrito: ${productName}, costo: ${costo}`);
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
                {[...Array(productoSeleccionado ? productoSeleccionado.cantidad : 0).keys()].map((num) => (
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
