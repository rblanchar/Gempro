import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../AuthProvider";
import "../styles/NavBar.css";

const NavBar = () => {
  const auth = useAuth();
  
  const [carritoCount, setCarritoCount] = useState(0);

  useEffect(() => {
   
      const carritoActual = JSON.parse(localStorage.getItem("carrito")) || [];
      
      setCarritoCount(carritoActual.length);
   
    
  }, []);

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
              <li style={{margin:'0px 0px 0px 10px'} }>
                <NavLink to="/Categorias">Categorías</NavLink>
              </li>
              <li>
              {carritoCount > 0 ? (
                  <NavLink to="/carrito">Carrito ({carritoCount})</NavLink>
                ) : (
                  <NavLink to="/carrito">Carrito</NavLink>
                )}
              </li>
              <li>
                <a href="#" onClick={() => auth.logOut()}>
                  Salir
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default NavBar;
