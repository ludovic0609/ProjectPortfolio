//import du css pour le login
import '../css/login.css';

//import des font awesome
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { faLock } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

//import de react redux, react router dom, des states et des actions à faire dans le reducer
import {setLogin} from "../actions/actions-types";
import { useDispatch,useSelector } from "react-redux";
import { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState({email: "",password:""});
    const [userLogin,setUserLogin] = useState(false);
    const[messageError,setMessageError]=useState("");
    
    const { isLogged } = useSelector(state => state);
    
    

    

    const dispatch = useDispatch();

    //si l'utilisateur est déjà connecter on le redirige vers la page dashboard admin
    useEffect(() => {
        if(isLogged===true){
            navigate('/admin');
        }
      },[isLogged] );

    const handleChange = (event)  => {
        event.preventDefault();
        setMessageError("");
        const {name, value} = event.target;
        setUser(oldUser => {
        return {
        ...user,
        [name]: value,
      };
    });
};

const handleSubmit = (event) => {
    event.preventDefault();
    
    if( user.email==="" || user.password===""){
        setMessageError("un des champ n'a pas été renseigné.");
        setUserLogin(false);
        return;
    }

        fetch('http://localhost:8080/login/', {
            method: "POST",
            headers: {
              'Content-type': 'application/json'
            },
            body: JSON.stringify(user)
          })
          .then((response) => {
            if (response.status===200) {
              return response.json();
            }
            throw new Error("email ou mot de passe incorrect");
          
          })
          .then((result) => {
            if(result){
                    setUserLogin("true");
                    dispatch(setLogin({result}));
            }
          })
          .catch((error)=>{
            
            setMessageError(error.toString());
          })
    
};

    return (
        <div className="container">
          
            <div className="form-box">
                <div className="header-form">
                <h4 className="text-primary text-center">
                    <p>Portfolio </p>
                    <FontAwesomeIcon className='user-icon'  icon={faUserCircle}  />
                </h4>
                <div className="image">
                </div>
                </div>
                <div className="body-form">
                <form method="post" onSubmit={handleSubmit}>
                    <div className="input-group mb-3">
                        <div className="input-group-prepend">
                            <span className="input-group-text" alt="email"><FontAwesomeIcon  icon={faUser}  /></span>
                        </div>
                        <input type="email" name="email" required className="form-control" placeholder="Email" onChange={handleChange} />
                    </div>
                    <div className="input-group mb-3">
                    <div className="input-group-prepend">
                    <span className="input-group-text" alt="password"><FontAwesomeIcon  icon={faLock}  /></span>
                    </div>
                    <input type="password" name="password" required className="form-control" placeholder="Mot de passe" onChange={handleChange} />
                    </div>
                    <div className="input-submit">
                    <button type="submit" className="btn btn-primary btn-block">LOGIN</button>
                    </div>
                    
                    <div className="message">
                        <p>{messageError}</p>
                    </div>
                </form>
            
          </div>
        </div>
       </div> 
    );
  }
  
  export default Login;