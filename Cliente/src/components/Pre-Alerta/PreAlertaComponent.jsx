import React from 'react';

const PreAlertaComponent = ({ date, origen, destino, peso, volumen, status }) => {
    return (
        <tr>
            <td className="py-3 px-6 text-left align-middle">{date}</td>
            <td className="py-3 px-6 text-left align-middle">{origen}</td>
            <td className="py-3 px-6 text-left align-middle">{destino}</td>
            <td className="py-3 px-6 text-left align-middle">{peso}</td>
            <td className="py-3 px-6 text-left align-middle">{volumen}</td>
            <td className="py-3 px-6 text-left align-middle">{status}</td>
        </tr>
    )
}

export default PreAlertaComponent;
