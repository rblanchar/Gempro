import { useNavigate } from 'react-router-dom';
import Navbar from "../components/NavBar";
import "../styles/About.css";

const About = () => {
   const navigate = useNavigate();
   return (
      <div>
         <Navbar />
         <h3 className='TitleAbout'>ABOUT</h3>
         <div className="containerA1">
            <p>
               Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ipsam, eligendi. Vel magni aliquam voluptatum, 
               nulla voluptates odio sunt et optio, minima dolorum veritatis esse soluta ut eveniet perspiciatis pariatur? 
               Tempora deleniti ducimus provident repudiandae vero tempore natus pariatur recusandae quam ex similique non, 
               temporibus, vitae distinctio expedita neque minima assumenda voluptates officiis at illum quibusdam inventore
               cupiditate eveniet! Voluptates itaque vitae quidem, rem sint tempora placeat dignissimos unde, id quisquam ea.
            </p>
            <p>
               Tempora deleniti ducimus provident repudiandae vero tempore natus pariatur recusandae quam ex similique non, 
               temporibus, vitae distinctio expedita neque minima assumenda voluptates officiis at illum quibusdam inventore
               cupiditate eveniet! Voluptates itaque vitae quidem, rem sint tempora placeat dignissimos unde, id quisquam ea.
            </p>
            <p>
               Vel magni aliquam voluptatum, nulla voluptates odio sunt et optio, minima dolorum veritatis esse soluta ut 
               eveniet perspiciatis pariatur? Tempora deleniti ducimus provident repudiandae vero tempore natus pariatur recusandae
               quam ex similique non, temporibus, vitae distinctio expedita neque minima assumenda voluptates officiis at illum
               quibusdam inventore cupiditate eveniet! Voluptates itaque vitae quidem, rem sint tempora placeat dignissimos unde,
               id quisquam ea.
            </p>
         </div>
      </div>
   );
};

export default About;
