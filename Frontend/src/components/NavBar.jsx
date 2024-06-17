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
                      <li onMouseEnter={() => handleSubmenuEnter('registrar')} onMouseLeave={handleSubmenuLeave}>
                        Registrar
                        {submenuVisible === 'registrar' && (
                          <ul className="submenu">
                            <li><NavLink to="/register/material">Material</NavLink></li>
                            <li><NavLink to="/register/categoria">Categoría</NavLink></li>
                            <li><NavLink to="/register/producto">Producto</NavLink></li>
                          </ul>
                        )}
                      </li>
                      <li onMouseEnter={() => handleSubmenuEnter('consultar')} onMouseLeave={handleSubmenuLeave}>
                        Consultar
                        {submenuVisible === 'consultar' && (
                          <ul className="submenu">
                            <li><NavLink to="/consultar/producto">Producto</NavLink></li>
                            <li><NavLink to="/consultar/material">Material</NavLink></li>
                            <li><NavLink to="/consultar/usuario">Usuario</NavLink></li>
                            <li><NavLink to="/consultar/factura">Factura</NavLink></li>
                            <li><NavLink to="/consultar/categoria">Categoría</NavLink></li>
                            <li><NavLink to="/consultar/detalle-factura">Detalle Factura</NavLink></li>
                          </ul>
                        )}
                      </li>
                      <li onMouseEnter={() => handleSubmenuEnter('eliminar')} onMouseLeave={handleSubmenuLeave}>
                        Eliminar
                        {submenuVisible === 'eliminar' && (
                          <ul className="submenu">
                            <li><NavLink to="/eliminar/producto">Producto</NavLink></li>
                            <li><NavLink to="/eliminar/material">Material</NavLink></li>
                            <li><NavLink to="/eliminar/usuario">Usuario</NavLink></li>
                            <li><NavLink to="/eliminar/categoria">Categoría</NavLink></li>
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
              <li>
                <NavLink to="/About">About</NavLink>
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

export default NavBar;
