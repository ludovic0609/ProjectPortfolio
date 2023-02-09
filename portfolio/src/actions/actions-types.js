//import des actions
import { SET_LOGIN,DISCONNECT } from "../constants/actions"


export const setLogin = payload =>{
    return{
        type: SET_LOGIN, payload
    }
}

export const disconnect = payload =>{
    return{
        type: DISCONNECT, payload
    }
}