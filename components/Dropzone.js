import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import clienteAxios from '../config/axios'; 

const DropZone = () => {

    //funcion que detecta el archivo en dropzone
    const onDrop = useCallback((acceptedFiles) => {
        console.log(acceptedFiles);
    });

    //extraer contenido de Dropzone
    const { getRootProps, getInputProps, isDragActive, acceptedFiles } = useDropzone({onDrop});

    return (  
        <div className="md:flex-1 h-50 mb-3 mx-2 mt-16 lg:mt-0 flex flex-col items-center justify-center border-dashed border-gray-400 border-2 bg-gray-100 px-4">
            <div { ...getRootProps({ className: "dropzone w-full py-32" }) }>
                <input className="h-100" { ...getInputProps() } />
                { isDragActive 
                ? <p className="text-2xl text-center text-gray-600">Suelta el archivo</p> 
                : 
                    <div className="text-center">
                        <p className="text-2xl text-center text-gray-600">Arrastra un archivo ó</p>
                        <button
                            type="button" 
                            className="text-xl bg-blue-700 w-full py-3 rounded-lg text-white my-10 hover:bg-blue-800"
                        >Seleciona un archivo</button>
                    </div>
                }
            </div>
        </div>        
    );
}
 
export default DropZone;