import React, { useState } from 'react';
import { useServices } from '../../hooks/useServices';
import { Service } from '../../types/service';

const ServiceForm: React.FC<{ service?: Service; onClose: () => void }> = ({ service, onClose }) => {
    const { createService, updateService } = useServices();
    const [name, setName] = useState(service?.name || '');
    const [description, setDescription] = useState(service?.description || '');
    const [priceUnitario, setPriceUnitario] = useState(service?.price_unitario || '');
    const [iva, setIva] = useState(service?.iva || '');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const serviceData = { name, description, price_unitario: parseFloat(priceUnitario), iva: parseFloat(iva) };

        if (service) {
            await updateService(service.id, serviceData);
        } else {
            await createService(serviceData);
        }
        onClose();
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">Nombre</label>
                <input
                    type="text"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-opacity-50"
                />
            </div>
            <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700">Descripción</label>
                <textarea
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-opacity-50"
                />
            </div>
            <div>
                <label htmlFor="priceUnitario" className="block text-sm font-medium text-gray-700">Precio Unitario</label>
                <input
                    type="number"
                    id="priceUnitario"
                    value={priceUnitario}
                    onChange={(e) => setPriceUnitario(e.target.value)}
                    required
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-opacity-50"
                />
            </div>
            <div>
                <label htmlFor="iva" className="block text-sm font-medium text-gray-700">IVA (%)</label>
                <input
                    type="number"
                    id="iva"
                    value={iva}
                    onChange={(e) => setIva(e.target.value)}
                    required
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-opacity-50"
                />
            </div>
            <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-md">Guardar</button>
        </form>
    );
};

export default ServiceForm;