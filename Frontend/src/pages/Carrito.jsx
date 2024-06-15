import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/NavBar";
import "../styles/Products.css";

const Carrito = () => {
  // Estado para almacenar el carrito
  const [carrito, setCarrito] = useState([]);

  // Estado para almacenar la suma de los costos
  const [total, setTotal] = useState(0);

  // Estado para almacenar la cantidad total de productos
  const [cantidadTotal, setCantidadTotal] = useState(0);

  // Hook de navegación
  const navigate = useNavigate();

  // Función para calcular el total del carrito
  const calcularTotal = (carrito) => {
    let totalCalculado = carrito.reduce((accumulator, current) => {
      return accumulator + (current.vrTotal || 0); // Asegurarse de sumar solo valores definidos
    }, 0);
    setTotal(totalCalculado);
  };

  // Función para calcular la cantidad total de productos
  const calcularCantidadTotal = (carrito) => {
    let cantidadCalculada = carrito.reduce((accumulator, current) => {
      return accumulator + (current.cantidad || 0); // Asegurarse de sumar solo valores definidos
    }, 0);
    setCantidadTotal(cantidadCalculada);
  };

  // Obtener el carrito del localStorage al cargar el componente
  useEffect(() => {
    const carritoLocalStorage = JSON.parse(localStorage.getItem("carrito")) || [];
    setCarrito(carritoLocalStorage);
    calcularTotal(carritoLocalStorage);
    calcularCantidadTotal(carritoLocalStorage);
  }, []);

  // Función para limpiar el carrito del localStorage
  const limpiarCarrito = () => {
    localStorage.removeItem("carrito");
    setCarrito([]);
    setTotal(0);
    setCantidadTotal(0);
  };

  // Función para redirigir a la página de registro de factura
  const handleRealizarCompra = () => {
    navigate("/register/factura", { state: { total: total } });
  };

  return (
    <div>
      <Navbar />
      <div className="prodSeleccionadoContainer">
        <h2 className="tituloPrdSel">Carrito de Compras</h2>
        {carrito.length === 0 ? (
          <p>No hay productos en el carrito.</p>
        ) : (
          <div className="carritoContainer">
            <table className="tablaCarrito">
              <thead>
                <tr>
                  <th className="tituloCarritoImg">Imagen</th>
                  <th className="thtituloCarritoCompra">Nombre</th>
                  <th className="thtituloCarritoCompra">Vr Unitario</th>
                  <th className="thtituloCarritoCompra">Cantidad</th>
                  <th className="thtituloCarritoCompra">Vr Total</th>
                </tr>
              </thead>
              <tbody>
                {carrito.map((producto, index) => (
                  <tr key={index}>
                    <td>
                      <img
                        className="imagenProdSelecionado"
                        src={producto.imageUrl}
                        alt={producto.productName}
                      />
                    </td>
                    <td>
                      <div className="divdescCarritoCompra">{producto.productName}</div>
                    </td>
                    <td>
                      <div className="divdescCarritoCompra">
                        $  {((producto.costo * producto.margen_ganancia) + producto.costo).toLocaleString('es-ES')}
                      </div>
                    </td>
                    <td>
                      <div className="divdescCarritoCompra">{producto.cantidad}</div>
                    </td>
                    <td>
                      <div className="divdescCarritoCompra">
                        $  {producto.vrTotal ? producto.vrTotal.toLocaleString('es-ES') : '0'}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="tablaResumen">
              <div className="tituloCarritoCompra" style={{ font: '16px Arial', fontWeight: 'bold' }}>RESUMEN DE COMPRA</div>
              <div className="totalCarrito">Cantidad Total de Productos: {cantidadTotal}</div>
              <div className="totalCarrito">Subtotal: $ {total.toLocaleString('es-ES')}</div>
              <div className="totalCarrito">Iva: $ {(total * .19).toLocaleString('es-ES')}</div>
              <div className="totalCarrito">Total a Pagar: $ {((total * .19) + total).toLocaleString('es-ES')}</div>
              <button className="btn-submitCarritoCompra" onClick={handleRealizarCompra}>
                Realizar Compra
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Carrito;
