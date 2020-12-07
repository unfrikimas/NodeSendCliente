import React from 'react';
import Layout from '../components/Layout';

const Enlace404 = () => {
    return (  
        <Layout>
            <div className="bg-red-500 py-2 px-3 w-full my-3 max-w-lg text-center text-white mx-auto mt-40">
                <p className="text-xl">Este enlace ya no está disponible!</p>
            </div>
        </Layout>
    );
}
 
export default Enlace404;