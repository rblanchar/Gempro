import React, { useEffect, useState } from 'react';
import { useAuth } from '../AuthProvider';
import Navbar from '../components/NavBar';
import "../styles/ListFacturas.css";

const InvoiceList = () => {
    const [facturas, setFacturas] = useState([]);
    const [mensaje, setMensaje] = useState('');
    const [filtro, setFiltro] = useState('');
    const [detalleFactura, setDetalleFactura] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const auth = useAuth();

    const formatNumber = (number) => {
        return number.toLocaleString('es-ES');
    };

    const formatDate = (dateString) => {
        const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
        return new Date(dateString).toLocaleDateString('es-ES', options);
    };

    useEffect(() => {
        const fetchFacturas = async () => {
            try {
                const response = await fetch('http://localhost:3000/factura', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: auth.token,
                    },
                });

                if (response.ok) {
                    const data = await response.json();
                    setFacturas(data.data);
                } else {
                    throw new Error('Error al cargar las facturas');
                }
            } catch (error) {
                console.error('Error al obtener las facturas:', error.message);
                setMensaje('Error al cargar las facturas');
            }
        };

        fetchFacturas();
    }, [auth.token]);

    const handleFiltroChange = (e) => {
        setFiltro(e.target.value);
    };

    const handleDoubleClick = async (id_factura) => {
        try {
            const response = await fetch(`http://localhost:3000/detallefactura/${id_factura}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: auth.token,
                },
            });
            //console.log(id_factura);//alskalskalsakls
            if (response.ok) {
                const data = await response.json();
                setDetalleFactura(data);
                setShowModal(true);
            } else {
                throw new Error('Error al cargar los detalles de la factura');
            }
        } catch (error) {
            console.error('Error al obtener los detalles de la factura:', error.message);
            setMensaje('Error al cargar los detalles de la factura');
        }
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    const filteredFacturas = facturas.filter((factura) => {
        const matchNombre = factura.NOMBRE.toLowerCase().includes(filtro.toLowerCase());
        const matchApellido = factura.APELLIDOS.toLowerCase().includes(filtro.toLowerCase());
        const matchCedula = factura.CEDULA.includes(filtro);
        return matchCedula || matchNombre || matchApellido;
    });

    return (
        <div>
            <Navbar />
            <div className="backgroundPL">
                <div className="containerPL">
                    <h2>Lista de Facturas</h2>
                    {mensaje && <div id="mensaje">{mensaje}</div>}
                    <div className="filtro-container">
                        <label htmlFor="filtro">Filtrar por Cliente (Cédula, Nombre o Apellido):</label>
                        <input
                            type="text"
                            id="filtro"
                            name="filtro"
                            value={filtro}
                            onChange={handleFiltroChange}
                        />
                    </div>
                    <table className="tablePL">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Fecha</th>
                                <th>Cédula</th>
                                <th>Nombre</th>
                                <th>Apellidos</th>
                                <th>Usuario</th>
                                <th>Subtotal</th>
                                <th>Total a Pagar</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredFacturas.map((factura) => (
                                <tr key={factura.ID_FACTURA} onDoubleClick={() => handleDoubleClick(factura.ID_FACTURA)}>
                                    <td>{factura.ID_FACTURA}</td>
                                    <td>{formatDate(factura.FECHA)}</td>
                                    <td>{factura.CEDULA}</td>
                                    <td>{factura.NOMBRE}</td>
                                    <td>{factura.APELLIDOS}</td>
                                    <td>{factura.NOMBRE_USUARIO}</td>
                                    <td>$ {formatNumber(factura.SUBTOTAL)}</td>
                                    <td>$ {formatNumber(factura.TOTAL_PAGAR)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    {showModal && (
                        <div className="modalDetalle">
                            <div className="modal-contentDetalle">
                                <span className="close" onClick={handleCloseModal}>&times;</span>
                                <h2>Detalle de la Factura</h2>
                                <table className="tablePLDetalle">
                                    <thead>
                                        <tr>
                                            <th>Factura</th>
                                            <th>Producto</th>
                                            <th>Descripción</th>
                                            <th>Cantidad</th>
                                            <th>Valor Unitario</th>
                                            <th>IVA</th>
                                            <th>Valor Total</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {detalleFactura.map((detalle) => (
                                            <tr key={detalle.ID_PRODUCTO}>
                                                <td>{detalle.ID_FACTURA}</td>
                                                <td>{detalle.ID_PRODUCTO}</td>
                                                <td>{detalle.DESCRIPCION}</td>
                                                <td>{detalle.CANTIDAD}</td>
                                                <td>$ {formatNumber(detalle.VALOR_UNITARIO)}</td>
                                                <td>$ {formatNumber(detalle.IVA)}</td>
                                                <td>$ {formatNumber(detalle.VALOR_TOTAL)}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default InvoiceList;
