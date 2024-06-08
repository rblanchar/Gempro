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
                  <h1>GEMPRO</h1>
               </div>
               <div className="menu-items">
                  <ul>
                     <li>
                        <NavLink to="/dashboard">Inicio</NavLink>
                     </li>
                     <li>
                        <NavLink to="/products">Productos</NavLink>
                     </li>
                     <li>
                        <NavLink to="/about">Acerca de</NavLink>
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
