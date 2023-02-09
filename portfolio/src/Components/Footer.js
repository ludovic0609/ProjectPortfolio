
//import des font awesomes
import { FaLinkedin } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
import { ImMail4 } from "react-icons/im";

const Footer = () => {

    // Variables pour les contacts
    const mailto="ludovic.charlier@hotmail.fr";
    const linkedin="https://www.linkedin.com/in/ludovic-charlier";
    const github_link_profil="https://github.com/ludovic0609";
  
    return (
      <>
      <footer>
        <div className="footer-bottom">
            <div className="social_footer">
                <a href={"mailto:"+mailto}><ImMail4/></a>
                <a  href={linkedin} target="_blank"><FaLinkedin/></a>
                <a href={github_link_profil} target="_blank"><FaGithub/></a>
            </div>
            <p>
                <label>copyright &copy; 2023 </label>
            </p> 
        </div>
      </footer>
      </>
    )
}
export default Footer;