import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../AuthProvider";
import { useCarrito } from "../components/CarritoContext";
import "../styles/NavBar.css";

const NavBar = () => {
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [submenuVisible, setSubmenuVisible] = useState("");
  const auth = useAuth();

  const handleMouseEnter = () => {
    setDropdownVisible(true);
  };

  const handleMouseLeave = () => {
    setDropdownVisible(false);
    setSubmenuVisible("");
  };

  const handleSubmenuEnter = (menu) => {
    setSubmenuVisible(menu);
  };

  const handleSubmenuLeave = () => {
    setSubmenuVisible("");
  };

  const { carrito } = useCarrito();
  const totalProductos = carrito.reduce((total, item) => total + item.cantidad, 0);
  const userType = auth.user ? auth.user.ID_TIPO : null;
  //console.log("User Type:", userType); 

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
              {userType === "1" && (
                <li
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                  className="dropdown"
                >
                  <div>Administrar</div>
                  {dropdownVisible && (
                    <ul className="dropdown-menu">
                      <li onMouseEnter={() => handleSubmenuEnter('Registrar')} onMouseLeave={handleSubmenuLeave}>
                        Registrar
                        {submenuVisible === 'Registrar' && (
                          <ul className="submenu">
                            <li><NavLink to="/register/material">Material</NavLink></li>
                            <li><NavLink to="/register/categoria">Categoría</NavLink></li>
                            <li><NavLink to="/register/producto">Producto</NavLink></li>
                          </ul>
                        )}
                      </li>
                      <li onMouseEnter={() => handleSubmenuEnter('Consultar')} onMouseLeave={handleSubmenuLeave}>
                        Consultar
                        {submenuVisible === 'Consultar' && (
                          <ul className="submenu">
                            <li><NavLink to="/list/productos">Productos</NavLink></li>
                            <li><NavLink to="/list/facturas">Facturas</NavLink></li>
                            <li><NavLink to="/list/clients">Clientes</NavLink></li>
                          </ul>
                        )}
                      </li>







                    </ul>
                  )}
                </li>
              )}
              <li style={{ margin: '0px 0px 0px 10px' }}>
                <NavLink to="/Categorias">Categorías</NavLink>
              </li>
              {auth.user && (
                <li>
                  {totalProductos > 0 ? (
                    <NavLink to="/carrito">Carrito ({totalProductos})</NavLink>
                  ) : (
                    <NavLink to="/carrito">Carrito</NavLink>
                  )}
                </li>
              )}
              <li>
                <NavLink to="/About">About</NavLink>
              </li>
              <li>
                {auth.user ? (
                  <a href="#" onClick={() => auth.logOut()}>Salir</a>
                ) : (
                  <NavLink to="/Login">Ingresar</NavLink>
                )}
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};
/**
  <li onMouseEnter={() => handleSubmenuEnter('Modificar')} onMouseLeave={handleSubmenuLeave}>
                        Modificar
                        {submenuVisible === 'Modificar' && (
                          <ul className="submenu">
                            <li><NavLink to="/update/producto">Producto</NavLink></li>
                            <li><NavLink to="/update/material">Material</NavLink></li>
                            <li><NavLink to="/update/usuario">Usuario</NavLink></li>
                            <li><NavLink to="/update/categoria">Categoría</NavLink></li>
                          </ul>
                        )}
                      </li>
 */
export default NavBar;
