//importando los types
import {
    REGISTRO_EXITOSO,  
    USUARIO_AUTENTICADO
} from '../../types';

const authReducer = (state, action) => {
    switch(action.type) {
        case REGISTRO_EXITOSO:
            return {
                ...state,
                mensaje: action.payload
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