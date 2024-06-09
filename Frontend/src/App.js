import AuthProvider from "./AuthProvider";
import { Route, Routes } from "react-router-dom";
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
import './styles/Login.css';


function App() {
  return (
    <div className="App">
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
          </Route>
        </Routes>
      </AuthProvider>

    </div>
  );
}

export default App;
