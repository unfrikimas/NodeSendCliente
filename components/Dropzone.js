import React, { useCallback, useContext } from 'react';
import { useDropzone } from 'react-dropzone';
import clienteAxios from '../config/axios'; 
import appContext from '../context/app/appContext';

const DropZone = () => {

    const AppContext = useContext(appContext);
    const { mostrarAlerta } = AppContext;

    const onDropRejected = () => {
        mostrarAlerta('No se pudo subir el archivo, el límite es 1MB. Obten una cuenta gratis para subir archivos más grandes.')
    }

    //funcion que detecta el archivo en dropzone
    const onDropAccepted = useCallback( async (acceptedFiles) => {
        
        //crear un formdata
        const formData = new FormData();
        formData.append('archivo', acceptedFiles[0]);

        const resultado = await clienteAxios.post('/api/archivos', formData);

    }, []);

    //extraer contenido de Dropzone
    const { getRootProps, getInputProps, isDragActive, acceptedFiles } = useDropzone({ onDropAccepted, onDropRejected, maxSize: 1000000 });

    const archivos = acceptedFiles.map(archivo => (
        <li
            key={ archivo.lastModified }
            className="bg-white flex-1 p-3 mb-4 shadow-lg rounded"
        >
            <p className="font-bold text-md">{ archivo.path }</p>
            <p className="text-sm text-gray-500">{ (archivo.size / Math.pow(1024, 2)).toFixed(2) } MB</p>
        </li>
    ))

    //creando el enlace
    const crearEnlace = () => {
        console.log('creando el enlace...');
    };

    return (  
        <div className="md:flex-1 h-50 mb-1 mx-2 mt-16 lg:mt-0 flex flex-col items-center justify-center border-dashed border-gray-400 border-2 bg-gray-100 px-4">
            { acceptedFiles.length > 0 ? (
                <div className="mt-10 w-full">
                    <h4 className="text-2xl font-bold text-center mb-4">Archivos</h4>
                    <ul>
                        { archivos }
                    </ul>
                    <button
                        type="button"
                        className="text-xl bg-blue-700 w-full py-3 rounded-lg text-white my-5 hover:bg-blue-800 focus:outline-none"
                        onClick={ () => crearEnlace() }
                    >Crear enlace</button>
                </div>
            ) : (                 
                <div { ...getRootProps({ className: "dropzone w-full py-32" }) }>
                    <input className="h-100" { ...getInputProps() } />
                    { isDragActive 
                    ? <p className="text-2xl text-center text-gray-600">Suelta el archivo</p> 
                    : 
                        <div className="text-center">
                            <p className="text-2xl text-center text-gray-600">Arrastra un archivo ó</p>
                            <button
                                type="button" 
                                className="text-xl bg-blue-700 w-full py-3 rounded-lg text-white my-10 hover:bg-blue-800 focus:outline-none"
                            >Seleciona un archivo</button>
                        </div>
                    }
                </div>
            )}
        </div>
    );
}
 
export default DropZone;