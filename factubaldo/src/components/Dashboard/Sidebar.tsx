import React from 'react';
import { useRouter } from 'next/router';

const Sidebar: React.FC = () => {
    const router = useRouter();

    const navigateTo = (path: string) => {
        router.push(path);
    };

    return (
        <div className="bg-gray-800 text-white w-64 h-full p-4">
            <h2 className="text-xl font-bold mb-4">Dashboard</h2>
            <ul>
                <li className="mb-2">
                    <button onClick={() => navigateTo('/dashboard')} className="w-full text-left hover:bg-gray-700 p-2 rounded">
                        Inicio
                    </button>
                </li>
                <li className="mb-2">
                    <button onClick={() => navigateTo('/clients')} className="w-full text-left hover:bg-gray-700 p-2 rounded">
                        Clientes
                    </button>
                </li>
                <li className="mb-2">
                    <button onClick={() => navigateTo('/services')} className="w-full text-left hover:bg-gray-700 p-2 rounded">
                        Servicios
                    </button>
                </li>
                <li className="mb-2">
                    <button onClick={() => navigateTo('/invoices')} className="w-full text-left hover:bg-gray-700 p-2 rounded">
                        Facturas
                    </button>
                </li>
                <li className="mb-2">
                    <button onClick={() => navigateTo('/settings')} className="w-full text-left hover:bg-gray-700 p-2 rounded">
                        Configuración
                    </button>
                </li>
            </ul>
        </div>
    );
};

export default Sidebar;