import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/authContext'; // Importa el contexto de autenticación

const CustomNavbar = () => {
    const { token, logout } = useAuth();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const handleLogout = () => {
        logout(); // Función para cerrar sesión
    };

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    return (
        <nav className='bg-white border-b border-gray-200 fixed w-full top-0 z-10'>
            <div className='container mx-auto px-4 sm:px-6 lg:px-8'>
                <div className='flex justify-between items-center py-3'>
                    <div className='flex-shrink-0'>
                        <Link to='/' className='text-xl font-semibold text-salmon-600'>
                            Logo
                        </Link>
                    </div>
                    <div className='hidden md:flex space-x-4 ml-auto'>
                        <Link to='/' className='text-gray-700 hover:text-salmon-600'>
                            Inicio
                        </Link>
                        <Link to='/productos' className='text-gray-700 hover:text-salmon-600'>
                            Productos
                        </Link>
                        <Link to='/servicios' className='text-gray-700 hover:text-salmon-600'>
                            Servicios
                        </Link>
                        <Link to='/contacto' className='text-gray-700 hover:text-salmon-600'>
                            Contacto
                        </Link>
                        {token ? (
                            <div className='relative'>
                                <button onClick={toggleDropdown} className='text-gray-700 hover:text-salmon-600 focus:outline-none'>
                                    Mi Cuenta
                                </button>
                                {isDropdownOpen && (
                                    <div className='absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-20'>
                                        <Link to='/perfil' className='block px-4 py-2 text-gray-700 hover:bg-gray-100'>Mi Perfil</Link>
                                        <Link to='/prealertas' className='block px-4 py-2 text-gray-700 hover:bg-gray-100'>Mis Prealertas</Link>
                                        <div className='border-t border-gray-100'></div>
                                        <button onClick={handleLogout} className='block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100'>Logout</button>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <Link to='/login'>
                                <button className='bg-transparent border border-gray-700 text-gray-700 hover:bg-gray-700 hover:text-white px-4 py-2 rounded-md'>
                                    Login
                                </button>
                            </Link>
                        )}
                    </div>
                    <div className='md:hidden'>
                        <button onClick={toggleMenu} className='text-gray-700 hover:text-salmon-600 focus:outline-none'>
                            <svg className='h-6 w-6' fill='none' stroke='currentColor' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'>
                                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M4 6h16M4 12h16m-7 6h7'></path>
                            </svg>
                        </button>
                    </div>
                </div>
                {isMenuOpen && (
                    <div className='md:hidden'>
                        <div className='px-2 pt-2 pb-3 space-y-1 sm:px-3'>
                            <Link to='/' className='block px-3 py-2 text-gray-700 hover:bg-gray-100'>Inicio</Link>
                            <Link to='/productos' className='block px-3 py-2 text-gray-700 hover:bg-gray-100'>Productos</Link>
                            <Link to='/servicios' className='block px-3 py-2 text-gray-700 hover:bg-gray-100'>Servicios</Link>
                            <Link to='/contacto' className='block px-3 py-2 text-gray-700 hover:bg-gray-100'>Contacto</Link>
                            {token ? (
                                <>
                                    <Link to='/perfil' className='block px-3 py-2 text-gray-700 hover:bg-gray-100'>Mi Perfil</Link>
                                    <Link to='/prealertas' className='block px-3 py-2 text-gray-700 hover:bg-gray-100'>Mis Prealertas</Link>
                                    <button onClick={handleLogout} className='block w-full text-left px-3 py-2 text-gray-700 hover:bg-gray-100'>Logout</button>
                                </>
                            ) : (
                                <Link to='/login'>
                                    <button className='bg-transparent border border-gray-700 text-gray-700 hover:bg-gray-700 hover:text-white px-4 py-2 rounded-md w-full text-center'>
                                        Login
                                    </button>
                                </Link>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </nav>
    );
};

export default CustomNavbar;
