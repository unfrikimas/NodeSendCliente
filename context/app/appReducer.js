
import {  
    MOSTRAR_ALERTA,
    LIMPIAR_ALERTA,
    SUBIENDO_ARCHIVO,
    SUBIR_ARCHIVO_EXITO,
    SUBIR_ARCHIVO_ERROR,
    CREAR_ENLACE_EXITO,
    CREAR_ENLACE_ERROR
} from '../../types';

const appReducer = (state, action) => {
    switch(action.type) {
        case MOSTRAR_ALERTA:
        case SUBIR_ARCHIVO_ERROR:
            return {
                ...state,
                mensaje_archivo: action.payload,
                cargando: false
            }
        case LIMPIAR_ALERTA:
            return {
                ...state,
                mensaje_archivo: ''
            }
        case SUBIR_ARCHIVO_EXITO:
            return {
                ...state,
                nombre: action.payload.nombre,
                nombre_original: action.payload.nombre_original,
                cargando: false
            }
        case SUBIENDO_ARCHIVO:
            return {
                ...state,
                cargando: true
            }
        default:
            return state
    }
};

export default appReducer;