import { Route, Routes } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import AuthProvider from "./AuthProvider";
import ScrollToTop from "./components/ScrollToTop";
import { CarritoProvider } from "./components/CarritoContext";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Categorias from "./pages/Categorias";
import About from "./pages/About";
import RegisterMaterial from "./pages/RegisterMaterial";
import RegisterTipoUsuario from "./pages/RegisterTipoUsuario";
import RegisterCategoria from "./pages/RegisterCategoria";
import RegisterProduct from "./pages/RegisterProduct";
import RegisterUsuario from "./pages/RegisterUsuario";
import RegisterCliente from "./pages/RegisterCliente";
import ProductosRelojesDeportivos from "./pages/ProductosRelojesDeportivos";
import ProductosRelojesFormales from "./pages/ProductosRelojesFormales";
import ProductosCadenasOro from "./pages/ProductosCadenasOro";
import ProductosCadenasPlata from "./pages/ProductosCadenasPlata";
import ProductosPulserasOro from "./pages/ProductosPulserasOro";
import ProductosAnillosMatrimonio from "./pages/ProductosAnillosMatrimonio";
import ProductosAnillosSolitarioPiedras from "./pages/ProductosAnillosSolitarioPiedras";
import ProductosDijesOro from "./pages/ProductosDijesOro";
import ProductosDijesPlata from "./pages/ProductosDijesPlata";
import ProductosAretesOro from "./pages/ProductosAretesOro";
import ProductoSeleccionado from "./pages/ProductoSeleccionado";
import ListProducts from "./pages/ListProducts";
import ListFacturas from "./pages/ListFacturas";
import ListClients from "./pages/ListClients";
import Carrito from "./pages/Carrito";
import RegisterFactura from "./pages/RegisterFactura";
import './styles/Login.css';

function App() {
  return (
    <div className="App">
      <ScrollToTop />
      <CarritoProvider>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/login" element={<Login />} />
            <Route path="/about" element={<About />} />
            <Route path="/Categorias" element={<Categorias />} />
            <Route path="/register/cliente" element={<RegisterCliente />} />
            <Route path="/productos/relojes/deportivos" element={<ProductosRelojesDeportivos />} />
            <Route path="/productos/relojes/formales" element={<ProductosRelojesFormales />} />
            <Route path="/productos/cadenas/oro" element={<ProductosCadenasOro />} />
            <Route path="/productos/cadenas/plata" element={<ProductosCadenasPlata />} />
            <Route path="/productos/pulseras/oro" element={<ProductosPulserasOro />} />
            <Route path="/productos/anillos/matrimonio" element={<ProductosAnillosMatrimonio />} />
            <Route path="/productos/anillos/solitarioPiedras" element={<ProductosAnillosSolitarioPiedras />} />
            <Route path="/productos/dijes/oro" element={<ProductosDijesOro />} />
            <Route path="/productos/dijes/plata" element={<ProductosDijesPlata />} />
            <Route path="/productos/aretes/oro" element={<ProductosAretesOro />} />
            <Route path="/productoSeleccionado" element={<ProductoSeleccionado />} />
            <Route element={<PrivateRoute />}>
              <Route path="/register/material" element={<RegisterMaterial />} />
              <Route path="/register/tipoUsuario" element={<RegisterTipoUsuario />} />
              <Route path="/register/categoria" element={<RegisterCategoria />} />
              <Route path="/register/producto" element={<RegisterProduct />} />
              <Route path="/register/usuario" element={<RegisterUsuario />} />
              <Route path="/register/factura" element={<RegisterFactura />} />
              <Route path="/list/productos" element={<ListProducts />} />
              <Route path="/list/facturas" element={<ListFacturas />} />
              <Route path="/list/clients" element={<ListClients />} />
              <Route path="/carrito" element={<Carrito />} />
            </Route>
          </Routes>
        </AuthProvider>
      </CarritoProvider>
    </div>
  );
}

export default App;
