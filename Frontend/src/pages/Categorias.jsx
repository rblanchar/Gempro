import React from "react";
import { NavLink } from "react-router-dom";
import Navbar from "../components/NavBar";
import '../styles/Categoria.css';

const Categorias = () => {
   return (
      <div>
         <Navbar />
         <h3 className="titleP">CATEGORIAS</h3>
         <div className="containerCategorias">
            <NavLink to="/productos/relojes/deportivos" className="opcionC relojesD">
               <div className="categoriaTexto">RELOJES DEPORTIVOS</div>
            </NavLink>
            <NavLink to="/productos/relojes/formales" className="opcionC relojesF">
               <div className="categoriaTexto">RELOJES FORMALES</div>
            </NavLink>
            <NavLink to ="/productos/cadenas/oro" className="opcionC cadenasO">
               <div className="categoriaTexto">CADENAS DE ORO</div>
            </NavLink>
            <NavLink to ="/productos/cadenas/plata" className="opcionC cadenasP">
               <div className="categoriaTexto">CADENAS DE PLATA</div>
            </NavLink>
            <NavLink to ="/productos/pulseras/oro" className="opcionC pulseras">
               <div className="categoriaTexto">PULSERAS</div>
            </NavLink>
            <NavLink to ="/productos/anillos/solitarioPiedras" className="opcionC anillosSolitarios">
               <div className="categoriaTexto">ANILLOS SOLITARIOS</div>
            </NavLink>
            <NavLink to ="/productos/anillos/matrimonio" className="opcionC anillosMatrimonio">
               <div className="categoriaTexto">ANILLOS DE MATRIMONIO</div>
            </NavLink>
            <NavLink to="/productos/dijes/oro" className="opcionC dijesO">
               <div className="categoriaTexto">DIJES DE ORO</div>
            </NavLink>
            <NavLink to="/productos/dijes/plata" className="opcionC dijesP">
               <div className="categoriaTexto">DIJES DE PLATA</div>
            </NavLink>
            <NavLink to="/productos/aretes/oro" className="opcionC aretes">
               <div className="categoriaTexto">ARETES</div>
            </NavLink>
         </div>
      </div>
   );
};

export default Categorias;
