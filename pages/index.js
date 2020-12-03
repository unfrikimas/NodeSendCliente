import React, { useContext, useEffect } from 'react';
import Layout from '../components/Layout';
import authContext from '../context/auth/authContext';
import appContext from '../context/app/appContext';
import Link from 'next/link';
import DropZone from '../components/Dropzone';
import Alerta from '../components/Alerta';

const Index = () => {

  const AuthContext = useContext(authContext);
  const { usuarioAutenticado } = AuthContext;

  const AppContext = useContext(appContext);
  const { mensaje_archivo, url } = AppContext;

  useEffect(() => {
    usuarioAutenticado();
  }, [])

  //funcion que copia el enlace
  const copiarEnlace = () => {
    navigator.clipboard.writeText(`${process.env.frontendURL}/enlaces/${url}`);
    document.getElementById('copiarEnlace').innerHTML="Copiado!";
    document.getElementById('copiarEnlace').className = "block m-auto px-8 py-4 bg-gray-900 rounded-lg p-2 text-white uppercase font-bold cursor-pointer mt-10 focus:outline-none";
    setTimeout(() => {
      document.getElementById('copiarEnlace').innerHTML="Copiar enlace";
      document.getElementById('copiarEnlace').className = "block m-auto px-8 py-4 bg-red-500 hover:bg-gray-900 rounded-lg p-2 text-white uppercase font-bold cursor-pointer mt-10 focus:outline-none";
    }, 1000);
  };

  return (  

    <Layout>
      <div className="md:w-4/5 xl:w-3/5 mx-auto mb-32 mt-40">
        { url 
        ?
          <>
            <p className="text-center text-2xl">
            <span className="font-bold text-red-700 text-3xl uppercase">Tu URL es</span> { `${process.env.frontendURL}/enlaces/${url}` }</p> 
            <button 
                  type="button"
                  id="copiarEnlace"
                  className="block m-auto px-8 py-4 bg-red-500 hover:bg-gray-900 rounded-lg p-2 text-white uppercase font-bold cursor-pointer mt-10 focus:outline-none"
                  onClick={ () => copiarEnlace() }
            >Copiar enlace</button>
          </>
        : 
          <>
            { mensaje_archivo && <Alerta /> }
            <div className="lg:flex md:shadow-lg p-5 bg-white rounded-lg py-10">
              <DropZone />
              <div className="md:flex-1 mb-3 mx-2 mt-16 lg:mt-0">
                <h2 className="text-4xl font-sans font-bold text-gray-800 my-4">Comparte archivos de forma sencilla y privada</h2>
                <p className="text-lg leading-loose">
                  <span className="text-red-500 font-bold">React Node Send </span>Cuando subes un archivo, Node Send genera un enlace que puedes compartir con el recipiente. Para más seguridad, también tienes la opción de establecer una contraseña y cambiar la configuración de la fecha de validez. Los archivos no se guardan en la nube.
                </p>
                <Link href="/crearcuenta">
                    <a className="text-red-500 text-lg hover:text-red-700">Crea un cuenta para mayores beneficios</a>
                </Link>
              </div>
            </div>
          </>
        }
      </div>
    </Layout>
  );
}
 
export default Index;
