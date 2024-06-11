import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../AuthProvider";
import "../styles/NavBar.css";

const NavBar = () => {

   const auth = useAuth();

   return (
      <div>
         <nav>
            <div className="navbar">
               <div className="logo">
                  <NavLink to="/dashboard">
                     <h1>JOYERIA D'LAURA</h1>
                  </NavLink>
               </div>
               <div className="menu-items">
                  <ul>
                     <li>
                        <div>Administrar</div>
                     </li>
                     <li>
                        <NavLink to="/Categorias">Categorias</NavLink>
                     </li>
                     <li>
                        <NavLink to="/about">Acerca de</NavLink>
                     </li>
                     <li>
                        <NavLink to="/carrito">Carrito</NavLink>
                     </li>
                     <li>
                        <a href="#" onClick={() => auth.logOut()}>Salir</a>
                     </li>
                  </ul>
               </div>
            </div>

         </nav>
      </div>
   );
};

export default NavBar;
