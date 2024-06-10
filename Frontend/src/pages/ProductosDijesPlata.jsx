import React from "react";
import Navbar from "../components/NavBar";
import '../styles/Products.css';

const dijesPlata = () => {
    return (
        <div>
            <Navbar />
            <h3 className="titlePRODUCTOS">DIJES DE ORO</h3>
            <div className="containerPRODCUTOS">
                <div className="opcionPROD dijeP1">
                    <div className="productoTexto">RELOJ 111111</div>
                </div>
                <div className="opcionPROD dijeP2">
                    <div className="productoTexto">RELOJ 222222</div>
                </div>
                <div className="opcionPROD dijeP3">
                    <div className="productoTexto">RELOJ 333333</div>
                </div>
                <div className="opcionPROD dijeP4">
                    <div className="productoTexto">RELOJ 44444</div>
                </div>
                <div className="opcionPROD dijeP5">
                    <div className="productoTexto">RELOJ 5555555</div>
                </div>
            </div>
        </div>
    );
};

export default dijesPlata;
