import React, { useReducer } from 'react';
import appContext from '../app/appContext';
import appReducer from '../app/appReducer';
import {  
    MOSTRAR_ALERTA,
    LIMPIAR_ALERTA,
    SUBIR_ARCHIVO_EXITO,
    SUBIR_ARCHIVO_ERROR,
    CREAR_ENLACE_EXITO,
    CREAR_ENLACE_ERROR
} from '../../types';

const AppState = ({children}) => {
    return (  
        <appContext.Provider
            value={{
                
            }}
        >
            {children}
        </appContext.Provider>
    );
}
 
export default AppState;