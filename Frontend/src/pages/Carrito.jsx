import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/NavBar";
import "../styles/Products.css";

const Carrito = () => {
  // Estado para almacenar el carrito
  const [carrito, setCarrito] = useState([]);

  // Estado para almacenar la suma de los costos
  const [total, setTotal] = useState(0);

  // Hook de navegación
  const navigate = useNavigate();

  // Función para calcular el total del carrito
  const calcularTotal = (carrito) => {
    let totalCalculado = carrito.reduce((accumulator, current) => {
      return accumulator + current.costo;
    }, 0);
    setTotal(totalCalculado);
  };

  // Obtener el carrito del localStorage al cargar el componente
  useEffect(() => {
    const carritoLocalStorage = JSON.parse(localStorage.getItem("carrito")) || [];
    setCarrito(carritoLocalStorage);
    calcularTotal(carritoLocalStorage);
  }, []);

  // Función para limpiar el carrito del localStorage
  const limpiarCarrito = () => {
    localStorage.removeItem("carrito");
    setCarrito([]);
    setTotal(0);
  };

  // Función para redirigir a la página de registro de factura
  const handleRealizarCompra = () => {
    // Aquí iría la lógica para realizar la compra, por ahora es simulada
    // Aquí se debería enviar la factura o realizar cualquier otro proceso
    // Luego de que la compra se ha realizado con éxito, limpiamos el carrito
    limpiarCarrito();
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
          <div>
            <table className="tablaCarrito">
              <thead>
                <tr>
                  <th>Imagen</th>
                  <th>Nombre</th>
                  <th>Precio</th>
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
                    <td>{producto.productName}</td>
                    <td>${producto.costo}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="totalCarrito">Total a pagar: ${total}</div>
            <button className="btn-submitImgSel" onClick={handleRealizarCompra}>
              Realizar Compra
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Carrito;
