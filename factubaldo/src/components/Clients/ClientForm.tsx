import React, { useState } from 'react';
import { useClients } from '../../hooks/useClients';
import { Client } from '../../types/client';

const ClientForm: React.FC<{ client?: Client; onClose: () => void }> = ({ client, onClose }) => {
    const { createClient, updateClient } = useClients();
    const [name, setName] = useState(client?.name || '');
    const [address, setAddress] = useState(client?.address || '');
    const [nifCif, setNifCif] = useState(client?.nifCif || '');
    const [email, setEmail] = useState(client?.email || '');
    const [phone, setPhone] = useState(client?.phone || '');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const clientData = { name, address, nifCif, email, phone };

        if (client) {
            await updateClient(client.id, clientData);
        } else {
            await createClient(clientData);
        }
        onClose();
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label className="block">Nombre</label>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="input"
                />
            </div>
            <div>
                <label className="block">Dirección</label>
                <input
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    required
                    className="input"
                />
            </div>
            <div>
                <label className="block">NIF/CIF</label>
                <input
                    type="text"
                    value={nifCif}
                    onChange={(e) => setNifCif(e.target.value)}
                    className="input"
                />
            </div>
            <div>
                <label className="block">Email</label>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="input"
                />
            </div>
            <div>
                <label className="block">Teléfono</label>
                <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="input"
                />
            </div>
            <button type="submit" className="btn">
                {client ? 'Actualizar Cliente' : 'Crear Cliente'}
            </button>
        </form>
    );
};

export default ClientForm;