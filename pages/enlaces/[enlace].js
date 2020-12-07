import Layout from '../../components/Layout';
import React, {useState, useContext } from 'react';
import appContext from '../../context/app/appContext';
import Alerta from '../../components/Alerta';
import clienteAxios from '../../config/axios';

const Enlace = ({datos}) => {

    // Context de la app
    const AppContext = useContext(appContext);
    const { mostrarAlerta, mensaje_archivo } = AppContext;
    const { enlace, archivo } = datos;

    const [ tienePassword, setTienePassword ] = useState(datos.password);
    const [ password, setPassword ] = useState('');

    const verificarPassword = async e => {
        e.preventDefault();

        const data = {
            password
        }

        try {
            const consulta = await clienteAxios.post(`${process.env.backendURL}/api/enlaces/${enlace}`, data);
            setTienePassword(consulta.data.password);
        } catch (error) {
            mostrarAlerta(error.response.data.msg);
        }
        
    }

    return (
        <Layout>
            {
                tienePassword ? (
                    <>
                        <p className="text-center">Este enlace está protegido por un password, escríbelo a continuación</p>

                        { mensaje_archivo && <Alerta /> }
                        <div className="flex justify-center mt-5">
                            <div className="w-full max-w-lg">
                                <form
                                    className="bg-white rounded shadow-md px-8 pt-6 pb-8 mb-4"
                                    onSubmit={ e => verificarPassword(e) }
                                >
                                    <div className="mb-4">
                                        <label 
                                            className="block text-black text-sm font-bold mb-2"
                                            htmlFor="password"
                                        >Password</label>
                                        <input
                                            type="password"
                                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                            id="password"
                                            placeholder="Password del enlace"
                                            value={password}
                                            onChange={ e => setPassword(e.target.value) }
                                        />
                                    </div>

                                    <input 
                                        type="submit"
                                        className="bg-red-500 hover:bg-gray-900 w-full p-2 text-white uppercase font-bold cursor-pointer"
                                        value="Validar Password..."
                                    />
                                </form>
                            </div>
                        </div>
                    </>
                ) : (
                    <>
                        <h1 className="text-4xl text-center text-gray-700">Descarga tu archivo:</h1>
                        <div className="flex items-center justify-center mt-10">
                            <a 
                                href={`${process.env.backendURL}/api/archivos/${archivo}`} 
                                className="bg-red-500 text-center px-10 py-3 rounded uppercase font-bold text-white cursor-pointer"
                                download    
                            >Aquí</a>
                        </div>
                    </>
                )
            }

        </Layout>
    )
}

export async function getServerSideProps(context) {

  const { params, res } = context
  const { enlace } = params;

  const resultado = await fetch(`${process.env.backendURL}/api/enlaces/${enlace}`);
  const datos = await resultado.json()
    //   console.log(datos)

  if(resultado.ok) {
    return {
      props: { datos }
    }
  }

  if (res) {
    return {
      redirect: {
        destination: '/enlace404',
        permanent: false,
      },
    }
  }

}

export default Enlace