import React from "react";
import Navbar from "../components/NavBar";
import '../styles/Products.css';

const relojesFormales = () => {
    return (
        <div>
            <Navbar />
            <h3 className="titlePRODUCTOS">RELOJES FORMALES</h3>
            <div className="containerPRODCUTOS">
                <div className="opcionPROD relojF1">
                    <div className="productoTexto">RELOJ 111111</div>
                </div>
                <div className="opcionPROD relojF2">
                    <div className="productoTexto">RELOJ 222222</div>
                </div>
                <div className="opcionPROD relojF3">
                    <div className="productoTexto">RELOJ 333333</div>
                </div>
                <div className="opcionPROD relojF4">
                    <div className="productoTexto">RELOJ 44444</div>
                </div>
                <div className="opcionPROD relojF5">
                    <div className="productoTexto">RELOJ 5555555</div>
                </div>
                <div className="opcionPROD relojF6">
                    <div className="productoTexto">RELOJ 666666</div>
                </div>
                <div className="opcionPROD relojF7">
                    <div className="productoTexto">RELOJ 77777777</div>
                </div>
                <div className="opcionPROD relojF8">
                    <div className="productoTexto">RELOJ 888888</div>
                </div>
                <div className="opcionPROD relojF9">
                    <div className="productoTexto">RELOJ 999999</div>
                </div>
            </div>
        </div>
    );
};

export default relojesFormales;
