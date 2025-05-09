import React, { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabaseClient';
import { Service } from '../../types/service';

const ServiceList: React.FC = () => {
    const [services, setServices] = useState<Service[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchServices = async () => {
            const { data, error } = await supabase
                .from('servicios')
                .select('*');

            if (error) {
                console.error('Error fetching services:', error);
            } else {
                setServices(data);
            }
            setLoading(false);
        };

        fetchServices();
    }, []);

    if (loading) {
        return <div>Cargando servicios...</div>;
    }

    return (
        <div>
            <h2>Lista de Servicios</h2>
            <ul>
                {services.map(service => (
                    <li key={service.id}>
                        <h3>{service.nombre}</h3>
                        <p>{service.descripcion}</p>
                        <p>Precio: {service.precio_unitario} €</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ServiceList;