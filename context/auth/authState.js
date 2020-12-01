import React, { useReducer } from 'react';
import authContext from './authContext';
import authReducer from './authReducer';

//importando los types
import {  
    USUARIO_AUTENTICADO
} from '../../types';

const AuthState = ({children}) => {

    //definir el state inicial
    const initialState = {
        token: '',
        autenticado: null,
        usuario: null,
        mensaje: null
    }

    //definir el reducer
    const [ state, dispatch ] = useReducer(authReducer, initialState);

    //registrar nuevos usuarios
    const registrarUsuario = datos => {
        console.log(datos);
    }

    //usuario autenticado
    const usuarioAutenticado = nombre => {
        dispatch({
            type: USUARIO_AUTENTICADO,
            payload: nombre
        })
    }

    return (
        <authContext.Provider
            value={{
                token: state.token,
                autenticado: state.autenticado,
                usuario: state.usuario,
                mensaje: state.mensaje,
                registrarUsuario,
                usuarioAutenticado
            }}
        >
            {children}
        </authContext.Provider>
    )

};

export default AuthState;