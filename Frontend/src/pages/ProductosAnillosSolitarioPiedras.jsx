import React from "react";
import Navbar from "../components/NavBar";
import '../styles/Products.css';

const anillosSolitarios = () => {
    return (
        <div>
            <Navbar />
            <h3 className="titlePRODUCTOS">ANILLOS SOLITARIOS</h3>
            <div className="containerPRODCUTOS">
                <div className="opcionPROD anilloSP1">
                    <div className="productoTexto">RELOJ 111111</div>
                </div>
                <div className="opcionPROD anilloSP2">
                    <div className="productoTexto">RELOJ 222222</div>
                </div>
                <div className="opcionPROD anilloSP3">
                    <div className="productoTexto">RELOJ 333333</div>
                </div>
                <div className="opcionPROD anilloSP4">
                    <div className="productoTexto">RELOJ 44444</div>
                </div>
                <div className="opcionPROD anilloSP5">
                    <div className="productoTexto">RELOJ 5555555</div>
                </div>
                <div className="opcionPROD anilloSP6">
                    <div className="productoTexto">RELOJ 666666</div>
                </div>
                <div className="opcionPROD anilloSP7">
                    <div className="productoTexto">RELOJ 333333</div>
                </div>
                <div className="opcionPROD anilloSP8">
                    <div className="productoTexto">RELOJ 44444</div>
                </div>
            </div>
        </div>
    );
};

export default anillosSolitarios;
