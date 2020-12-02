//importando los types
import {
    REGISTRO_EXITOSO,
    REGISTRO_ERROR,
    LOGIN_EXITOSO,
    LOGIN_ERROR,
    LIMPIAR_ALERTA,  
    USUARIO_AUTENTICADO
} from '../../types';

const authReducer = (state, action) => {
    switch(action.type) {
        case REGISTRO_EXITOSO:
        case REGISTRO_ERROR: 
        case LOGIN_ERROR:
            return {
                ...state,
                mensaje: action.payload
            }
        case LOGIN_EXITOSO:
            return {
                ...state,
                token: action.payload,
                mensaje: action.payload
            }
        case LIMPIAR_ALERTA:
            return {
                ...state,
                mensaje: null
            }
        case USUARIO_AUTENTICADO:
            return {
                ...state,
                usuario: action.payload
            }
        default:
            return state;
    }
}

export default authReducer;