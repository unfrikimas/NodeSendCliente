import React from 'react';
import Head from 'next/head';

const Layout = ({ children }) => {
    return (  
        <>
            <Head>
                <title>React Node Send</title>
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/tailwindcss/2.0.1/tailwind.min.css" integrity="sha512-+WF6UMXHki/uCy0vATJzyA9EmAcohIQuwpNz0qEO+5UeE5ibPejMRdFuARSrl1trs3skqie0rY/gNiolfaef5w==" crossOrigin="anonymous" />
            </Head>

            <div className="bg-gray-100 min-h-screen">
                <div className="container mx-auto">
                    <main className="mt-20">
                        { children }
                    </main>
                </div>
            </div>
        </>
    );
}
 
export default Layout;