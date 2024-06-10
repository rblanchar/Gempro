import React from "react";
import Navbar from "../components/NavBar";
import '../styles/Products.css';

const relojesDeportivos = () => {
    return (
        <div>
            <Navbar />
            <h3 className="titlePRODUCTOS">RELOJES DEPORTIVOS</h3>
            <div className="containerPRODCUTOS">
                <div className="opcionPROD reloj1">
                    <div className="productoTexto">RELOJ 111111</div>
                </div>
                <div className="opcionPROD reloj2">
                    <div className="productoTexto">RELOJ 222222</div>
                </div>
                <div className="opcionPROD reloj3">
                    <div className="productoTexto">RELOJ 333333</div>
                </div>
                <div className="opcionPROD reloj4">
                    <div className="productoTexto">RELOJ 44444</div>
                </div>
                <div className="opcionPROD reloj5">
                    <div className="productoTexto">RELOJ 5555555</div>
                </div>
                <div className="opcionPROD reloj6">
                    <div className="productoTexto">RELOJ 666666</div>
                </div>
                <div className="opcionPROD reloj7">
                    <div className="productoTexto">RELOJ 77777777</div>
                </div>
                <div className="opcionPROD reloj8">
                    <div className="productoTexto">RELOJ 888888</div>
                </div>
                <div className="opcionPROD reloj9">
                    <div className="productoTexto">RELOJ 999999</div>
                </div>
                <div className="opcionPROD reloj10">
                    <div className="productoTexto">RELOJ 1010110</div>
                </div>
            </div>
        </div>
    );
};

export default relojesDeportivos;
