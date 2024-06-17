import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../AuthProvider";
import Navbar from "../components/NavBar";
import { useCarrito } from "../components/CarritoContext";
import Swal from "sweetalert2";
import "../styles/Registers.css";

const RegisterFactura = () => {
    const location = useLocation();
    const { limpiarCarrito } = useCarrito();
    const { user, token } = useAuth();
    const navigate = useNavigate();

    const subtotal = location.state?.total || 0;
    const iva = subtotal * 0.19;
    const totalPagar = subtotal + iva;

    const [mensaje, setMensaje] = useState("");
    const [factura, setFactura] = useState({
        id_cliente: user.ID_CLIENTE,
        id_usuario: "401",
        subtotal: "",
        total_pagar: "",
    });

    const carrito = location.state?.carrito || [];

    useEffect(() => {
        setFactura((prevFactura) => ({
            ...prevFactura,
            subtotal: "",
            total_pagar: "",
        }));
    }, [subtotal]);

    const handleSubmitEvent = async (e) => {
        e.preventDefault();

        if (user.ID_TIPO !== "4") {
            setMensaje("Solo los clientes pueden registrar una factura.");
            return;
        }

        if (factura.id_cliente.trim() !== "" && factura.id_usuario.trim() !== "") {
            try {
                // Registrar la factura
                const responseFactura = await fetch("http://localhost:3000/factura", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify(factura),
                });

                if (responseFactura.ok) {
                    const dataFactura = await responseFactura.json();
                    //console.log('Factura registrada:', dataFactura);

                    await Promise.all(
                        carrito.map(async (producto) => {
                            //console.log(producto);
                            const detalleFactura = {
                                id_producto: producto.idProduct,
                                cantidad: producto.cantidad,
                                valor_unitario: ((producto.costo * producto.margen_ganancia) + producto.costo),
                                iva: ((((producto.costo * producto.margen_ganancia) + producto.costo) * .19) * producto.cantidad),
                                valor_total: ((((producto.costo * producto.margen_ganancia) + producto.costo) * producto.cantidad)),
                            };

                            const responseDetalle = await fetch("http://localhost:3000/detallefactura", {
                                method: "POST",
                                headers: {
                                    "Content-Type": "application/json",
                                    Authorization: `Bearer ${token}`,
                                },
                                body: JSON.stringify(detalleFactura),
                            });

                            if (!responseDetalle.ok) {
                                console.error('Error al enviar detalle de factura:', responseDetalle.statusText);
                            }
                        })
                    );

                    limpiarCarrito();
                    //alert("Compra realizada con Éxito!");
                    //navigate("/dashboard");
                    Swal.fire({
                        title: "Compra realizada con Éxito!",
                        text: "Gracias por su compra.",
                        icon: "success",
                        confirmButtonText: "OK"
                    }).then(() => {
                        navigate("/dashboard");
                    });

                } else {
                    const data = await responseFactura.json();
                    setMensaje(data.message || "Error al registrar la factura");
                }
            } catch (error) {
                console.error("Error al registrar la factura:", error.message);
                setMensaje("Error de Conexion");
            }
        } else {
            setMensaje("Todos los campos son obligatorios");
        }
    };

    const handleInput = (e) => {
        const { name, value } = e.target;
        setFactura((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    return (
        <div>
            <Navbar />
            <div className="backgroundRCli">
                <div className="containerRCli">
                    <div id="mensaje">{mensaje}</div>
                    <h2 className="tituloU-C">Confirmación de Compra</h2>
                    <form id="datos" onSubmit={handleSubmitEvent}>
                        <div>
                            {user && (
                                <>
                                    <p>Nombre: {user.NOMBRE} {user.APELLIDOS}</p>
                                    <p>Dirección: {user.DIRECCION} </p>
                                    <p>Barrio: {user.BARRIO} </p>
                                    <p>Teléfono: {user.TELEFONO}</p>
                                </>
                            )}
                            <p>Subtotal: ${subtotal.toLocaleString("es-ES")}</p>
                            <p>IVA: ${iva.toLocaleString("es-ES")}</p>
                            <p>Total a Pagar: ${totalPagar.toLocaleString("es-ES")}</p>
                            <button className="btn-submitImgSel">Realizar Compra</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default RegisterFactura;
