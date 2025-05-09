import React from 'react';
import { useClients } from '../../hooks/useClients';
import { Client } from '../../types/client';

const ClientList: React.FC = () => {
    const { clients, loading, error } = useClients();

    if (loading) return <div>Cargando clientes...</div>;
    if (error) return <div>Error al cargar clientes: {error.message}</div>;

    return (
        <div>
            <h2>Lista de Clientes</h2>
            <ul>
                {clients.map((client: Client) => (
                    <li key={client.id}>
                        {client.nombre} - {client.email}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ClientList;