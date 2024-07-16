import React from 'react';
import { useTheme } from '../../contexts/themeContext'; // Importa el contexto de temas
import Carousel from '../UI/Carousel';

const Home = () => {
    const { isDarkMode } = useTheme(); // Obtén el estado actual del modo oscuro

    return (
        <div className={`flex items-center justify-center py-2 px-4 sm:px-6 lg:px-8 ${isDarkMode ? 'dark:bg-gray-800 dark:text-white' : 'bg-golden-sand-400 text-black'}`}>
            <div className="container mx-auto py-8 max-w-screen-lg">
                <Carousel />
                <div className='mt-8 text-center'>
                    <p className='text-lg font-semibold'>¡Hola mundo!</p>
                    <h2>¿CÓMO FUNCIONA NUESTRO SERVICIO?

                        Confía en nosotros para gestionar el proceso completo de importación de tus productos desde China hasta su entrega en Chile. Nos encargamos de recibir tus productos en China y coordinamos todos los aspectos logísticos, asegurando una importación sin complicaciones.
                    </h2>
                    <input type="text" placeholder='nombre'/>
                    <input type="text" placeholder='Apellido'/>
                </div>
            </div>
        </div>
    );
};

export default Home;
