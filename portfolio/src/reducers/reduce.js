import { SET_LOGIN,DISCONNECT} from "../constants/actions";

// initialisation des states: SOURCE DE VERITE
const stateInit = {
    message: '',
    sessionLocal:JSON.parse(sessionStorage.getItem("dashboard_portfolio")) || [],
    isLogged: false
}
const reducer = (state = stateInit, action = {}) => {

    let {message,isLogged,sessionLocal} = state;
    switch(action.type){
        
        case SET_LOGIN:
                    //on recupere l'utilisateur qui s'est connecter
                    //on initialise la sessionStorage et renvoi le state
                    const result=action.payload.result;

                    sessionStorage.setItem("dashboard_portfolio", JSON.stringify(result));
                  return{
                    ...state,
                    isLogged:result.isLogged,

                    sessionLocal:JSON.parse(sessionStorage.getItem("dashboard_portfolio")) || []
                } 
        case DISCONNECT:
                    //appel du backend en get
                   fetch('http://localhost:8080/logout')
                     .then((response) => response.json())
                     .then((result) => {
                       if(result){
                           //Si tout c'est bien passé on supprime la sessionStorage de l'utilisateur et renvoi le state
                           sessionStorage.removeItem("dashboard_portfolio");  
                     
                       }
                     })
   
                   return{
                       ...state,
                       isLogged:false,
                       sessionLocal: []
                   }

        default:

                   if(JSON.parse(sessionStorage.getItem("dashboard_portfolio"))!=null){
                       state.isLogged=true;
                       sessionLocal=JSON.parse(sessionStorage.getItem("dashboard_portfolio"));
                       
                   }else{
                       state.isLogged=false;
                       sessionLocal=[];
                   }
                   return{
                       ...state,
                       isLogged:state.isLogged,
                       sessionLocal:sessionLocal,
                   }

    }

}

export default reducer;