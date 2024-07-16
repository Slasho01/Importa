import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/authContext'; // Importa el contexto de autenticación
import { useTheme } from '../../contexts/themeContext';

const CustomNavbar = () => {
    const { token, logout } = useAuth();
    const { isDarkMode, toggleDarkMode } = useTheme();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const handleLogout = () => {
        logout(); // Función para cerrar sesión
    
        // Redirige al usuario a la página de inicio
        window.location.href = '/';
    };

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    return (
        <nav className={`bg-golden-sand-600 border-b border-golden-sand-400 fixed w-full top-0 z-10 ${isDarkMode ? 'dark:bg-gray-800 dark:border-gray-600' : ''}`}>
            <div className='container mx-auto px-4 sm:px-6 lg:px-8'>
                <div className='flex justify-between items-center py-3'>
                    <div className='flex-shrink-0'>
                        <Link to='/' className='text-xl font-semibold text-salmon-600'>
                            Logo
                        </Link>
                    </div>
                    <div className='hidden md:flex space-x-4 ml-auto'>
                        <Link to='/' className='text-gray-950 hover:text-gray-500 text-xl dark:text-gray-50 dark:hover:text-golden-sand-600'>
                            Inicio
                        </Link>
                        <Link to='/Servicios' className='text-gray-950 hover:text-gray-500 text-xl dark:text-gray-50 dark:hover:text-golden-sand-600'>
                            Servicios
                        </Link>
                        <Link to='/Calculadora' className='text-gray-950 hover:text-gray-500 text-xl dark:text-gray-50 dark:hover:text-golden-sand-600'>
                            Cotizar
                        </Link>
                        <Link to='/Calculadora' className='text-gray-950 hover:text-gray-500 text-xl dark:text-gray-50 dark:hover:text-golden-sand-600'>
                            Nosotros
                        </Link>
                        <Link to='/Contactanos' className='text-gray-950 hover:text-gray-500 text-xl dark:text-gray-50 dark:hover:text-golden-sand-600'>
                            Contactanos
                        </Link>
                            <button
                                className={`p-2 rounded-full ${isDarkMode ? 'bg-gray-800 text-gray-300' : 'bg-yellow-300 text-yellow-900'} dark:bg-gray-600 dark:text-gray-200 focus:outline-none`}
                                onClick={toggleDarkMode}
                            >
                                {isDarkMode ? (
                                    <svg xmlns='http://www.w3.org/2000/svg' className='h-6 w-6' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
                                        <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M16 12a4 4 0 11-8 0 4 4 0 018 0z' />
                                        <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M12 6v6m0 0v6m0-6h6m-6 0H6' />
                                    </svg>
                                ) : (
                                    <svg xmlns='http://www.w3.org/2000/svg' className='h-6 w-6' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
                                        <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M12 6v6m0 0v6m0-6h6m-6 0H6' />
                                    </svg>
                                )}
                            </button>
                        {token ? (
                            <div className='relative'>
                                <button onClick={toggleDropdown} className='text-gray-950 hover:text-gray-500 text-xl dark:text-gray-50 dark:hover:text-golden-sand-600'>
                                    Mi Cuenta
                                </button>
                                {isDropdownOpen && (
                                    <div className='absolute right-0 mt-2 w-48 bg-golden-sand-500 dark:bg-gray-950 rounded-md shadow-lg py-1 z-20'>
                                        <Link to='/perfil' className='block px-4 py-2 text-gray-700 hover:bg-golden-sand-600 dark:text-gray-50 dark:hover:bg-gray-600'>Mi Perfil</Link>
                                        <Link to='/prealertas' className='block px-4 py-2 text-gray-700 hover:bg-golden-sand-600 dark:text-gray-50 dark:hover:bg-gray-600'>Mis Prealertas</Link>
                                        <div className='border-t border-golden-sand-400 dark:border-gray-400'></div>
                                        <button onClick={handleLogout} className='block w-full text-left px-4 py-2 text-gray-700 hover:bg-golden-sand-600 dark:text-gray-50 dark:hover:bg-gray-600'>Logout</button>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <Link to='/login'>
                                <button className='bg-transparent  text-gray-950  hover:border hover:border-golden-sand-700 hover:text-gray-500 px-4 py-1 rounded-md'>
                                    Ingresar
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
                            <button
                                className={`p-2 rounded-full ${isDarkMode ? 'bg-gray-800 text-gray-300' : 'bg-yellow-300 text-yellow-900'} dark:bg-gray-600 dark:text-gray-200 focus:outline-none`}
                                onClick={toggleDarkMode}
                            >
                                {isDarkMode ? (
                                    <svg xmlns='http://www.w3.org/2000/svg' className='h-6 w-6' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
                                        <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M16 12a4 4 0 11-8 0 4 4 0 018 0z' />
                                        <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M12 6v6m0 0v6m0-6h6m-6 0H6' />
                                    </svg>
                                ) : (
                                    <svg xmlns='http://www.w3.org/2000/svg' className='h-6 w-6' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
                                        <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M12 6v6m0 0v6m0-6h6m-6 0H6' />
                                    </svg>
                                )}
                            </button>
                            {token ? (
                                <>
                                    <Link to='/perfil' className='block px-3 py-2 text-gray-700 hover:bg-gray-100'>Mi Perfil</Link>
                                    <Link to='/prealertas' className='block px-3 py-2 text-gray-700 hover:bg-gray-100'>Mis Prealertas</Link>
                                    <button onClick={handleLogout} className='block w-full text-left px-3 py-2 text-gray-700 hover:bg-gray-100'>Logout</button>
                                </>
                            ) : (
                                <Link to='/login'>
                                    <button className='bg-transparent text-gray-950  hover:text-gray-500 hover:border hover:border-gray-950 px-4 py-2 rounded-md w-full text-center'>
                                    Ingresar
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
