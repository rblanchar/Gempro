import React from "react";
import Navbar from "../components/NavBar";
import '../styles/Products.css';

const cadenasPlata = () => {
    return (
        <div>
            <Navbar />
            <h3 className="titlePRODUCTOS">CADENAS DE PLATA</h3>
            <div className="containerPRODCUTOS">
                <div className="opcionPROD cadP1">
                    <div className="productoTexto">RELOJ 111111</div>
                </div>
                <div className="opcionPROD cadP2">
                    <div className="productoTexto">RELOJ 222222</div>
                </div>
                <div className="opcionPROD cadP3">
                    <div className="productoTexto">RELOJ 333333</div>
                </div>
                <div className="opcionPROD cadP4">
                    <div className="productoTexto">RELOJ 44444</div>
                </div>
                <div className="opcionPROD cadP5">
                    <div className="productoTexto">RELOJ 5555555</div>
                </div>
                <div className="opcionPROD cadP6">
                    <div className="productoTexto">RELOJ 666666</div>
                </div>
            </div>
        </div>
    );
};

export default cadenasPlata;
