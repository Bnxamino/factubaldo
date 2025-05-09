import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import { Client } from '../types/client';

const useClients = () => {
    const [clients, setClients] = useState<Client[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const fetchClients = async () => {
        setLoading(true);
        const { data, error } = await supabase.from('clientes').select('*');
        if (error) {
            setError(error.message);
        } else {
            setClients(data);
        }
        setLoading(false);
    };

    const addClient = async (client: Client) => {
        const { data, error } = await supabase.from('clientes').insert([client]);
        if (error) {
            setError(error.message);
        } else {
            setClients([...clients, ...data]);
        }
    };

    const updateClient = async (id: string, updatedClient: Partial<Client>) => {
        const { data, error } = await supabase.from('clientes').update(updatedClient).eq('id', id);
        if (error) {
            setError(error.message);
        } else {
            setClients(clients.map(client => (client.id === id ? { ...client, ...updatedClient } : client)));
        }
    };

    const deleteClient = async (id: string) => {
        const { error } = await supabase.from('clientes').delete().eq('id', id);
        if (error) {
            setError(error.message);
        } else {
            setClients(clients.filter(client => client.id !== id));
        }
    };

    useEffect(() => {
        fetchClients();
    }, []);

    return { clients, loading, error, addClient, updateClient, deleteClient };
};

export default useClients;