import React, { useReducer } from 'react';
import appContext from '../app/appContext';
import appReducer from '../app/appReducer';
import clienteAxios from '../../config/axios';
import {  
    MOSTRAR_ALERTA,
    LIMPIAR_ALERTA,
    SUBIENDO_ARCHIVO,
    SUBIR_ARCHIVO_EXITO,
    SUBIR_ARCHIVO_ERROR,
    CREAR_ENLACE_EXITO,
    CREAR_ENLACE_ERROR
} from '../../types';

const AppState = ({children}) => {
    
    const initialState = {
        mensaje_archivo: '',
        nombre: '',
        nombre_original: '',
        cargando: false,
    }

    const [ state, dispatch ] = useReducer(appReducer, initialState);

    //Muestra una alerta
    const mostrarAlerta = msg => {
        console.log(msg);
        dispatch({
            type: MOSTRAR_ALERTA,
            payload: msg
        });

        setTimeout(() => {
            dispatch({
                type: LIMPIAR_ALERTA
            })
        }, 6000);
    }

    //sube los archivos al servidor
    const subirArchivo = async (formData, nombreArchivo) => {

        dispatch({
            type: SUBIENDO_ARCHIVO
        })

        try {
            const resultado = await clienteAxios.post('/api/archivos', formData);
            dispatch({
                type: SUBIR_ARCHIVO_EXITO,
                payload: {
                    nombre: resultado.data.archivo,
                    nombre_original: nombreArchivo
                }
            })
        } catch (error) {
            // console.log(error);
            dispatch({
                type: SUBIR_ARCHIVO_ERROR,
                payload: error.response.data.msg
            })
        }
    }

    return (  
        <appContext.Provider
            value={{
                mensaje_archivo: state.mensaje_archivo,
                nombre: state.nombre,
                nombre_original: state.nombre_original,
                cargando: state.cargando,
                mostrarAlerta,
                subirArchivo
            }}
        >
            {children}
        </appContext.Provider>
    );
}
 
export default AppState;