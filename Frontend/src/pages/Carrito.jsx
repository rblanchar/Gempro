import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/NavBar";
import { useCarrito } from "../components/CarritoContext";
import "../styles/Products.css";

const Carrito = () => {
  const { carrito, eliminarDelCarrito } = useCarrito();
  const [total, setTotal] = useState(0);
  const [cantidadTotal, setCantidadTotal] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    calcularTotal(carrito);
    calcularCantidadTotal(carrito);
  }, [carrito]);

  const calcularTotal = (carrito) => {
    let totalCalculado = carrito.reduce((accumulator, current) => {
      return accumulator + (current.vrTotal || 0);
    }, 0);
    setTotal(totalCalculado);
  };

  const calcularCantidadTotal = (carrito) => {
    let cantidadCalculada = carrito.reduce((accumulator, current) => {
      return accumulator + (current.cantidad || 0);
    }, 0);
    setCantidadTotal(cantidadCalculada);
  };

  const handleRealizarCompra = () => {
    navigate("/register/factura", { state: { total: total, carrito: carrito } });
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
                  <th></th>
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
                      <button className="buttonEliProdCarr" onClick={() => eliminarDelCarrito(index)}>X</button>
                    </td>
                    <td>
                      <img
                        className="imagenProdSelecionadoP"
                        src={producto.imageUrl}
                        alt={producto.productName}
                      />
                    </td>
                    <td>
                      <div className="divdescCarritoCompra">{producto.productName}</div>
                    </td>
                    <td>
                      <div className="divdescCarritoCompra">
                        $ {((producto.costo * producto.margen_ganancia) + producto.costo).toLocaleString('es-ES')}
                      </div>
                    </td>
                    <td>
                      <div className="divdescCarritoCompra">{producto.cantidad}</div>
                    </td>
                    <td>
                      <div className="divdescCarritoCompra">
                        $ {producto.vrTotal ? producto.vrTotal.toLocaleString('es-ES') : '0'}
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
              <div className="totalCarrito">IVA (19%): $ {(total * 0.19).toLocaleString('es-ES')}</div>
              <div className="totalCarrito">Total a Pagar: $ {(total * 1.19).toLocaleString('es-ES')}</div>
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
