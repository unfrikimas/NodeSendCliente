import React, { useContext, useEffect } from 'react';
import Layout from '../components/Layout';
import authContext from '../context/auth/authContext';

const Index = () => {

  const AuthContext = useContext(authContext);
  const { usuarioAutenticado } = AuthContext;

  useEffect(() => {
    usuarioAutenticado();
  }, [])

  return (  

    <Layout>
      <h1>Inicio</h1>
    </Layout>
  );
}
 
export default Index;
