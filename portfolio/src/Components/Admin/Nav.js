import { NavLink } from "react-router-dom";

import { useSelector } from "react-redux";
import {disconnect} from "../../actions/actions-types";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const NavAdmin = () => {
  const navigate = useNavigate();

  const { isLogged } = useSelector(state => state);
  const [idProfil,setIdProfil] = useState("");

  const dispatch = useDispatch();
  const handleClick = (event)  => {
    dispatch(disconnect({event}));
};

//si l'utilsateur n'est pas connecter alors on le redirige vers la page d'accueil
useEffect(() => {
  if(isLogged===false){
      navigate('/');
  }

},[isLogged] );

useEffect(() => {
  fetch('http://localhost:8080/profil')
  .then(
    response => response.json())
  .then(res => {
    setIdProfil(res[0]._id);
  });

}, []);

    return (
      <>
      <div className={"topnav"} id="myTopnav">
        
      <NavLink to="/admin/" >Accueil</NavLink>
      <NavLink to={"/admin/edit/profil/"+idProfil}>Editer mon profil</NavLink>
      <NavLink to="/admin/category">Catégories</NavLink>
      <NavLink  onClick={handleClick}>Se deconnecter</NavLink>
      </div>
      </>
    )
}
export default NavAdmin;