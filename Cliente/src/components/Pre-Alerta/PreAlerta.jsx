import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    getPreAlertas
} from '../../redux/actions';
import PreAlertaComponent from './PreAlertaComponent';

const PreAlerta = () => {
    const dispatch = useDispatch();
    const prealertas = useSelector(state => state.preAlerta);

    useEffect(() => {
        dispatch(getPreAlertas());
    }, [dispatch]);

    return (
        <div className='min-h-screen flex items-center justify-center bg-golden-sand-300 dark:bg-gray-700 py-12 px-4 sm:px-6 lg:px-8'>
            <div className='max-w-7xl w-full flex justify-center'>
                <div className='flex flex-col sm:flex-row w-full justify-center'>

                    <table className="min-w-full bg-white border-gray-200 border rounded-lg shadow-md">
                        <thead className="bg-gray-200 text-gray-700 uppercase text-sm leading-normal">
                            <tr>
                                <th className="py-3 px-6 text-left">Fecha</th>
                                <th className="py-3 px-6 text-left">Origen</th>
                                <th className="py-3 px-6 text-left">Destino</th>
                                <th className="py-3 px-6 text-left">Peso</th>
                                <th className="py-3 px-6 text-left">Volumen</th>
                                <th className="py-3 px-6 text-left">Estado</th>
                            </tr>
                        </thead>
                        <tbody className="text-gray-600 text-sm font-light">
                            {prealertas && prealertas.map((prealerta) => (
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
                </div>
            </div>
        </div>
    )
}

export default PreAlerta;
