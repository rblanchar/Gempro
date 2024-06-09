//import { useNavigate } from 'react-router-dom';
import Navbar from "../components/NavBar";
import '../styles/Categoria.css';

const Categorias = () => {
   //const navigate = useNavigate();
   return (
      <div>
         <Navbar />
         <h3 className="titleP">CATEGORIAS</h3>
         <div className="containerCategorias">
            <div className="opcionP">RELOJES</div>
            <div className="opcionP">CADENAS</div>
            <div className="opcionP">PULSERAS</div>
            <div className="opcionP">ANILLOS SOLITARIOS</div>
            <div className="opcionP">ANILLOS DE MATRIMONIO</div>
            <div className="opcionP">DIJES</div>
         </div>

      </div>
   );
};

export default Categorias;
