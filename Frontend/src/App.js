import AuthProvider from "./AuthProvider";
import { Route, Routes } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";
import PrivateRoute from "./PrivateRoute";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Categorias from "./pages/Categorias"
import About from "./pages/About"
import RegisterMaterial from "./pages/RegisterMaterial";
import RegisterTipoUsuario from "./pages/RegisterTipoUsuario";
import RegisterCategoria from "./pages/RegisterCategoria";
import RegisterProduct from "./pages/RegisterProduct";
import RegisterUsuario from "./pages/RegisterUsuario";
import RegisterCliente from "./pages/RegisterCliente";
import ProductosRelojesDeportivos from "./pages/ProductosRelojesDeportivos.jsx";
import ProductosRelojesFormales from "./pages/ProductosRelojesFormales.jsx";
import ProductosCadenasOro from "./pages/ProductosCadenasOro.jsx";
import ProductosCadenasPlata from "./pages/ProductosCadenasPlata.jsx";
import ProductosPulserasOro from "./pages/ProductosPulserasOro.jsx";
import ProductosAnillosMatrimonio from "./pages/ProductosAnillosMatrimonio.jsx";
import ProductosAnillosSolitarioPiedras from "./pages/ProductosAnillosSolitarioPiedras.jsx";
import ProductosDijesOro from "./pages/ProductosDijesOro.jsx";
import ProductosDijesPlata from "./pages/ProductosDijesPlata.jsx";
import ProductosAretesOro from "./pages/ProductosAretesOro.jsx";
import ProductoSeleccionado from "./pages/ProductoSeleccionado.jsx";
import './styles/Login.css';


function App() {
  return (
    <div className="App">
      <ScrollToTop />
      <AuthProvider>
        <Routes>
        
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route element={<PrivateRoute />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/Categorias" element={<Categorias />} />
            <Route path="/about" element={<About />} />
            <Route path="/register/material" element={<RegisterMaterial />} />
            <Route path="/register/tipoUsuario" element={<RegisterTipoUsuario />} />
            <Route path="/register/categoria" element={<RegisterCategoria />} />
            <Route path="/register/producto" element={<RegisterProduct />} />
            <Route path="/register/usuario" element={<RegisterUsuario />} />
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
          </Route>
        </Routes>
      </AuthProvider>

    </div>
  );
}

export default App;
