import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPreAlertas, postPreAlerta } from '../../redux/actions';
import { getUserIdFromToken } from '../../utils/jwtToken.js';
import PreAlertaComponent from './PreAlertaComponent';
import Button from '../UI/Button';
import Modal from '../UI/Modal'; // Asegúrate de tener el componente Modal

const PreAlerta = () => {
    const dispatch = useDispatch();
    const prealertas = useSelector(state => state.preAlerta || []);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [formData, setFormData] = useState({
        date: '',
        origen: '',
        destino: '',
        peso: '',
        volumen: '',
        status: ''
    })

    useEffect(() => {
        dispatch(getPreAlertas());
    }, [dispatch]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };
    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const userId = await getUserIdFromToken();
            formData.userId = userId;
            formData.status= "Registrada"
            await dispatch(postPreAlerta(formData));
            handleCloseModal(); // Close the modal after submission
            dispatch(getPreAlertas()); // Refresh the prealertas list
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className='min-h-screen flex items-center justify-center bg-golden-sand-300 dark:bg-gray-700 py-12 px-4 sm:px-6 lg:px-8'>
            <div className='max-w-7xl w-full'>
                <div className='flex justify-between items-center mb-4'>
                    <h1 className='text-2xl font-bold'>Lista de PreAlertas</h1>
                    <Button onClick={handleOpenModal}>Añadir Prealerta</Button>
                </div>
                <table className="min-w-full bg-white border-gray-200 border rounded-lg shadow-md">
                    <thead className="bg-gray-200 text-gray-700 uppercase text-sm leading-normal">
                        <tr>
                        <th className="py-3 px-6 text-left"></th>
                            <th className="py-3 px-6 text-left">Fecha</th>
                            <th className="py-3 px-6 text-left">Origen</th>
                            <th className="py-3 px-6 text-left">Destino</th>
                            <th className="py-3 px-6 text-left">Peso</th>
                            <th className="py-3 px-6 text-left">Volumen</th>
                            <th className="py-3 px-6 text-left">Estado</th>
                        </tr>
                    </thead>
                    <tbody className="text-gray-600 text-sm font-light">
                        {prealertas && prealertas.length > 0 && prealertas.map((prealerta) => (
                            <PreAlertaComponent
                                key={prealerta.id}
                                id={prealerta.id}
                                date={prealerta.date}
                                origen={prealerta.origen}
                                destino={prealerta.destino}
                                peso={prealerta.peso}
                                volumen={prealerta.volumen}
                                status={prealerta.status}
                            />
                        ))}
                    </tbody>
                </table>
                {isModalOpen && (
                    <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
                        <form onSubmit={handleSubmit}>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="origen">
                                    Origen
                                </label>
                                <input
                                    name="origen"
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    id="origen"
                                    type="text"
                                    placeholder="Origen"
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="destino">
                                    Destino
                                </label>
                                <input
                                    name="destino"
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    id="destino"
                                    type="text"
                                    placeholder="Destino"
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="date">
                                    Fecha
                                </label>
                                <input
                                    name="date"
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    id="date"
                                    type="date"
                                    placeholder="Fecha"
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="peso">
                                    Peso
                                </label>
                                <input
                                    name="peso"
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    id="peso"
                                    type="text"
                                    placeholder="Peso"
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="volumen">
                                    Volumen
                                </label>
                                <input
                                    name="volumen"
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    id="volumen"
                                    type="text"
                                    placeholder="Volumen"
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="flex items-center justify-between">
                                <button
                                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                    type="submit"
                                >
                                    Añadir PreAlerta
                                </button>
                            </div>
                        </form>
                    </Modal>
                )}
            </div>
        </div>
    );
};

export default PreAlerta;