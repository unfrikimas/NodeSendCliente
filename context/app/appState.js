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
    CREAR_ENLACE_ERROR,
    LIMPIAR_STATE,
    AGREGAR_PASSWORD,
    AGREGAR_DESCARGAS,
    EXISTE_ENLACE
} from '../../types';

const AppState = ({children}) => {
    
    const initialState = {
        mensaje_archivo: '',
        mensaje_enlace: '',
        nombre: '',
        nombre_original: '',
        cargando: false,
        descargas: 1,
        password: '',
        autor: null,
        url: ''
    }

    const [ state, dispatch ] = useReducer(appReducer, initialState);

    //Muestra una alerta
    const mostrarAlerta = msg => {
        // console.log(msg);
        dispatch({
            type: MOSTRAR_ALERTA,
            payload: msg
        });

        setTimeout(() => {
            dispatch({
                type: LIMPIAR_ALERTA
            })
        }, 5000);
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

    //creando el enlace luego de subir el archivo
    const crearEnlace = async () => {

        const data = {
            nombre: state.nombre,
            nombre_original: state.nombre_original,
            descargas: state.descargas,
            password: state.password,
            autor: state.autor,            
        }

        try {
            const resultado = await clienteAxios.post('/api/enlaces', data);
            dispatch({
                type: CREAR_ENLACE_EXITO,
                payload: resultado.data.msg
            })
        } catch (error) {
            // console.log(error);
            dispatch({
                type: CREAR_ENLACE_ERROR,
                payload: error.response.data.msg
            })
        }

    };

    //obtener enlace
    const obtenerEnlace = async enlace => {
        try {
            const resultado = await clienteAxios.get(`/api/enlaces/${enlace}`);
            dispatch({
                type: EXISTE_ENLACE,
                payload: ''
            })
        } catch (error) {
            dispatch({
                type: EXISTE_ENLACE,
                // payload: error.response.data.msg
            })
        }
    }

    //limpiando state
    const limpiarState = () => {
        dispatch({
            type: LIMPIAR_STATE
        })
    }

    //Obtener el password
    const agregarPassword = password => {
        dispatch({
            type: AGREGAR_PASSWORD,
            payload: password
        })
    }

    //Obtener el numero de descargas
    const agregarDescargas = descargas => {
        dispatch({
            type: AGREGAR_DESCARGAS,
            payload: descargas
        })
    }


    return (  
        <appContext.Provider
            value={{
                mensaje_archivo: state.mensaje_archivo,
                mensaje_enlace: state.mensaje_enlace,
                nombre: state.nombre,
                nombre_original: state.nombre_original,
                cargando: state.cargando,
                descargas: state.descargas,
                password: state.password,
                autor: state.autor,
                url: state.url,
                mostrarAlerta,
                subirArchivo,
                crearEnlace,
                limpiarState,
                agregarPassword,
                agregarDescargas,
                obtenerEnlace
            }}
        >
            {children}
        </appContext.Provider>
    );
}
 
export default AppState;