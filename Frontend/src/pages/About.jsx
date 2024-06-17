//import { useNavigate } from 'react-router-dom';
import Navbar from "../components/NavBar";
import "../styles/About.css";

const About = () => {
   //const navigate = useNavigate();
   return (
      <div className="divAbout">
         <Navbar />
         <div className="containerA1">
            <h3 className='TitleAbout'>Quienes Somos</h3>
            <p>
               Bienvenidos a Joyeria D' Laura, donde la elegancia y la calidad se unen en cada pieza. Desde 1980, hemos sido sinónimo de excelencia en el mundo de la joyería, especializándonos en relojes de lujo, cadenas exquisitas y la fabricación artesanal de anillos de matrimonio.
            </p>
            <h3 className='TitleAbout'>Nuestra Historia</h3>
            <p>
               Fundada en 1980, Joyeria D' Laura comenzó como un pequeño taller familiar dedicado a la creación de joyas únicas y personalizadas. Con el paso de los años, nuestro compromiso con la calidad y la atención al detalle nos ha permitido crecer y convertirnos en un referente en el sector de la joyería.
            </p>
            <h3 className='TitleAbout'>Nuestra Pasión</h3>
            <p>
               Nuestra pasión por la joyería va más allá de la simple fabricación de piezas. Cada reloj, cadena y anillo de matrimonio es una obra de arte, creada con los más altos estándares de calidad y un diseño atemporal. Nos enorgullece trabajar con los mejores materiales y técnicas innovadoras para ofrecer joyas que no solo sean hermosas, sino que también cuenten una historia y se conviertan en herencias para las generaciones futuras.
            </p>
            <h3 className='TitleAbout'>Nuestro Compromiso</h3>
            <p>
               En Joyeria D' Laura, creemos que cada cliente es único y merece una experiencia personalizada. Nuestro equipo de especialistas está aquí para asesorarte y ayudarte a encontrar la joya perfecta para cada ocasión. Ya sea que estés buscando un reloj elegante, una cadena sofisticada o el anillo de matrimonio de tus sueños, estamos aquí para hacer realidad tus deseos.
               <h3 className='TitleAbout'>Nuestro Taller</h3>
            </p>
            <p>
               Como fabricantes de anillos de matrimonio, nos dedicamos a crear piezas que simbolicen el amor y el compromiso. Nuestro taller combina la artesanía tradicional con la tecnología moderna para asegurar que cada anillo sea perfecto. Trabajamos estrechamente con nuestros clientes para diseñar anillos personalizados que reflejen su estilo y personalidad.
               <h3 className='TitleAbout'>Visítanos</h3>
            </p>
            <p>
               Te invitamos a visitar nuestra tienda y descubrir la belleza y calidad de nuestras joyas. Permítenos ser parte de tus momentos más especiales y ayudarte a celebrar la vida con elegancia y distinción.
            </p>
         </div>
      </div >
   );
};

export default About;
