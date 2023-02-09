
//import de Hashlink pour les redirections d'ancre avec le menu
import { HashLink } from 'react-router-hash-link';

const Nav = () => {
  
 
    return (
      <>
      <nav className="navbar">
            <div className="logo">
            <img src={require('../LogoCL.svg').default} alt='Logo SVG' />
            </div>
            <ul className="nav-links">
                    <input type="checkbox" id="checkbox_toggle" />
                    <label htmlFor="checkbox_toggle" className="hamburger">&#9776;</label>
                    <div className="menu">
                        <li>
                            <HashLink to="/#myprofil">Accueil</HashLink>
                        </li>
                        <li>
                            <HashLink to="/#about-me">À propos</HashLink>
                        </li>
                        <li>
                            <HashLink to="/#skills">Compétences</HashLink>
                        </li>
                        <li>
                            <HashLink to="/#workexperience">Expériences</HashLink>
                        </li>
                        <li>
                            <HashLink to="/#education">Éducation</HashLink>
                        </li>
                        <li>
                            <HashLink to="/#project">Projets</HashLink>
                        </li>

                    </div>
             </ul>
        </nav>
      </>
    )
}
export default Nav;