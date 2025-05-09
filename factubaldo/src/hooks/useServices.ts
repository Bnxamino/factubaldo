import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import { Service } from '../types/service';

const useServices = () => {
    const [services, setServices] = useState<Service[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const fetchServices = async () => {
        setLoading(true);
        const { data, error } = await supabase
            .from('servicios')
            .select('*');

        if (error) {
            setError(error.message);
        } else {
            setServices(data);
        }
        setLoading(false);
    };

    const addService = async (service: Service) => {
        const { data, error } = await supabase
            .from('servicios')
            .insert([service]);

        if (error) {
            setError(error.message);
        } else {
            setServices([...services, ...data]);
        }
    };

    const updateService = async (id: string, updatedService: Service) => {
        const { data, error } = await supabase
            .from('servicios')
            .update(updatedService)
            .eq('id', id);

        if (error) {
            setError(error.message);
        } else {
            setServices(services.map(service => (service.id === id ? { ...service, ...updatedService } : service)));
        }
    };

    const deleteService = async (id: string) => {
        const { error } = await supabase
            .from('servicios')
            .delete()
            .eq('id', id);

        if (error) {
            setError(error.message);
        } else {
            setServices(services.filter(service => service.id !== id));
        }
    };

    useEffect(() => {
        fetchServices();
    }, []);

    return { services, loading, error, addService, updateService, deleteService };
};

export default useServices;