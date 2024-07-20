import React, { useEffect, useState } from 'react';
import { useAuth } from '../AuthProvider';
import Navbar from '../components/NavBar';
import "../styles/ListProducts.css";

const ProductList = () => {
  const [productos, setProductos] = useState([]);
  const [mensaje, setMensaje] = useState('');
  const [filtroDescripcion, setFiltroDescripcion] = useState('');
  const [filtroCantidad, setFiltroCantidad] = useState(false);
  const [imagenAmpliada, setImagenAmpliada] = useState(null);
  const [productoSeleccionado, setProductoSeleccionado] = useState(null); // Nuevo estado
  const auth = useAuth();

  const formatNumber = (number) => {
    return number.toLocaleString('es-ES');
  };

  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const response = await fetch('http://localhost:3000/producto/personalizado', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: auth.token,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setProductos(data.data);
        } else {
          throw new Error('Error al cargar los productos');
        }
      } catch (error) {
        console.error('Error al obtener los productos:', error.message);
        setMensaje('Error al cargar los productos');
      }
    };

    fetchProductos();
  }, [auth.token]);

  const handleFiltroChange = (e) => {
    setFiltroDescripcion(e.target.value);
  };

  const handleFiltroCantidadChange = (e) => {
    setFiltroCantidad(e.target.checked);
  };

  const handleProductoSeleccionado = (producto) => {
    setProductoSeleccionado(producto);
  };

  const closeModal = () => {
    setProductoSeleccionado(null);
    setImagenAmpliada(null);
  };

  const handleActualizarProducto = async () => {
    try {
      const response = await fetch(`http://localhost:3000/producto/${productoSeleccionado.ID_PRODUCTO}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: auth.token,
        },
        body: JSON.stringify({
          id_producto: productoSeleccionado.ID_PRODUCTO,
          descripcion: productoSeleccionado.DESCRIPCION,
          costo: productoSeleccionado.COSTO,
          peso: productoSeleccionado.PESO,
          margen_ganancia: productoSeleccionado.MARGEN_GANANCIA,
          cantidad: productoSeleccionado.CANTIDAD,
          id_categoria: productoSeleccionado.ID_CATEGORIA,
          id_material: productoSeleccionado.ID_MATERIAL
        }),
      });
  
      if (response.ok) {
        // Actualizar el estado local de productos
        const productosActualizados = productos.map((producto) =>
          producto.ID_PRODUCTO === productoSeleccionado.ID_PRODUCTO ? productoSeleccionado : producto
        );
        setProductos(productosActualizados);
        closeModal(); // Cerrar el modal después de actualizar
      } else {
        throw new Error('Error al actualizar el producto');
      }
    } catch (error) {
      console.error('Error al actualizar el producto:', error.message);
      setMensaje('Error al actualizar el producto');
    }
  };
  
  const openModal = (imagen) => {
    setImagenAmpliada(imagen);
  };

  const filteredProductos = productos.filter((producto) => {
    const matchDescripcion = producto.DESCRIPCION.toLowerCase().includes(filtroDescripcion.toLowerCase());
    const matchCantidad = filtroCantidad ? producto.CANTIDAD < 3 : true;
    return matchDescripcion && matchCantidad;
  });

  return (
    <div>
      <Navbar />
      <div className="backgroundPL">
        <div className="containerPL">
          <h2>Lista de Productos</h2>
          {mensaje && <div id="mensaje">{mensaje}</div>}
          <div className="filtro-container">
            <label htmlFor="filtroDescripcion">Filtrar por Descripción:</label>
            <input
              type="text"
              id="filtroDescripcion"
              name="filtroDescripcion"
              value={filtroDescripcion}
              onChange={handleFiltroChange}
            />
            <label className="filtroDCantidad" htmlFor="filtroCantidad">Productos con baja existencia:</label>
            <input
              type="checkbox"
              id="filtroCantidad"
              name="filtroCantidad"
              checked={filtroCantidad}
              onChange={handleFiltroCantidadChange}
            />
          </div>
          <table className="tablePL">
            <thead>
              <tr>
                <th>ID</th>
                <th className='thTituloProd'>Descripción</th>
                <th className='thTituloProd'>Valor Unitario</th>
                <th>Cantidad</th>
                <th className='thTituloProd'>Categoría</th>
                <th className='thTituloProd'>Material</th>
                <th>Imagen</th>
              </tr>
            </thead>
            <tbody>
              {filteredProductos.map((producto) => (
                <tr key={producto.ID_PRODUCTO} onDoubleClick={() => handleProductoSeleccionado(producto)}>
                  <td>{producto.ID_PRODUCTO}</td>
                  <td>{producto.DESCRIPCION.toUpperCase()}</td>
                  <td>$ {formatNumber(producto.VALOR_UNITARIO)}</td>
                  <td>{producto.CANTIDAD}</td>
                  <td>{producto.CATEGORIA}</td>
                  <td>{producto.MATERIAL}</td>
                  <td>
                    {producto.IMAGEN && (
                      <img
                        src={`http://localhost:3001/${producto.IMAGEN}`}
                        alt={producto.DESCRIPCION}
                        className="product-image"
                        onClick={() => openModal(producto.IMAGEN)}
                      />
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {imagenAmpliada && (
            <div className="modalP">
              <div className="modal-contentP">
                <span className="closeP" onClick={closeModal}>&times;</span>
                <img
                  src={`http://localhost:3001/${imagenAmpliada}`}
                  alt="Imagen Ampliada"
                  className="modal-imageP"
                />
              </div>
            </div>
          )}
          {productoSeleccionado && (
            <div className="modal">
              <div className="modal-content">
                <span className="close" onClick={closeModal}>&times;</span>
                <h2>Modificar Producto</h2>
                <label htmlFor="descripcion">Descripción:</label>
                <input
                  type="text"
                  id="descripcion"
                  value={productoSeleccionado.DESCRIPCION}
                  onChange={(e) => setProductoSeleccionado({ ...productoSeleccionado, DESCRIPCION: e.target.value })}
                />
                <label htmlFor="cantidad">Cantidad:</label>
                <input
                  type="number"
                  id="cantidad"
                  value={productoSeleccionado.CANTIDAD}
                  onChange={(e) => setProductoSeleccionado({ ...productoSeleccionado, CANTIDAD: parseInt(e.target.value) })}
                />
                <button onClick={handleActualizarProducto}>Guardar Cambios</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductList;
