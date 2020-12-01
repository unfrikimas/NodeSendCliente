import React from 'react';
import Link from 'next/link';

const Header = () => {
    return (  
        <header className="py-8 flex flex-col md:flex-row items-center justify-between">
            <div>
                <Link href="/">
                    <a>
                        <img className="w-64 mb-8 md:mb-0" src="img/logo.svg"/>            
                    </a>
                </Link>
            </div>
            <div>
                <Link href="/login">
                    <a className="bg-red-500 px-5 py-3 rounded-lg text-white font-bold uppercase mr-2">Iniciar sesión</a>
                </Link>
                <Link href="/crearcuenta">
                    <a className="bg-black px-5 py-3 rounded-lg text-white font-bold uppercase">Crear cuenta</a>
                </Link>
            </div>
        </header>
    );
}
 
export default Header;