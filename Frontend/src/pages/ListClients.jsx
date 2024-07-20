import React, { useEffect, useState } from 'react';
import { useAuth } from '../AuthProvider';
import Navbar from '../components/NavBar';
import "../styles/ListClients.css";

const ClientList = () => {
    const [clientes, setClientes] = useState([]);
    const [mensaje, setMensaje] = useState('');
    const [filtro, setFiltro] = useState('');
    const auth = useAuth();

    useEffect(() => {
        const fetchClientes = async () => {
            try {
                const response = await fetch('http://localhost:3000/cliente', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: auth.token,
                    },
                });

                if (response.ok) {
                    const data = await response.json();
                    setClientes(data.data);
                } else {
                    throw new Error('Error al cargar los clientes');
                }
            } catch (error) {
                console.error('Error al obtener los clientes:', error.message);
                setMensaje('Error al cargar los clientes');
            }
        };

        fetchClientes();
    }, [auth.token]);

    const handleFiltroChange = (e) => {
        setFiltro(e.target.value);
    };

    const filteredClientes = clientes.filter((cliente) =>
        cliente.CEDULA.toLowerCase().includes(filtro.toLowerCase()) ||
        cliente.NOMBRE.toLowerCase().includes(filtro.toLowerCase()) ||
        cliente.APELLIDOS.toLowerCase().includes(filtro.toLowerCase())
    );

    return (
        <div>
            <Navbar />
            <div className="backgroundPL">
                <div className="containerPL">
                    <h2>Lista de Clientes</h2>
                    {mensaje && <div id="mensaje">{mensaje}</div>}
                    <div className="filtro-container">
                        <label htmlFor="filtro">Filtrar por Cédula, Nombre o Apellidos:</label>
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
                                <th>Cédula</th>
                                <th>Nombre</th>
                                <th>Apellidos</th>
                                <th>Dirección</th>
                                <th>Barrio</th>
                                <th>Teléfono</th>
                                <th>Email</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredClientes.map((cliente) => (
                                <tr key={cliente.ID_CLIENTE}>
                                    <td>{cliente.CEDULA}</td>
                                    <td>{cliente.NOMBRE}</td>
                                    <td>{cliente.APELLIDOS}</td>
                                    <td>{cliente.DIRECCION}</td>
                                    <td>{cliente.BARRIO}</td>
                                    <td>{cliente.TELEFONO}</td>
                                    <td>{cliente.CORREO}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default ClientList;
