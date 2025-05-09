import React from 'react';
import { useInvoices } from '../../hooks/useInvoices';
import { Invoice } from '../../types/invoice';

const InvoiceList: React.FC = () => {
    const { invoices, loading, error } = useInvoices();

    if (loading) {
        return <div>Cargando facturas...</div>;
    }

    if (error) {
        return <div>Error al cargar las facturas: {error.message}</div>;
    }

    return (
        <div>
            <h2>Lista de Facturas</h2>
            <table className="min-w-full border-collapse border border-gray-200">
                <thead>
                    <tr>
                        <th className="border border-gray-300 p-2">ID</th>
                        <th className="border border-gray-300 p-2">Cliente</th>
                        <th className="border border-gray-300 p-2">Fecha</th>
                        <th className="border border-gray-300 p-2">Total</th>
                        <th className="border border-gray-300 p-2">Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {invoices.map((invoice: Invoice) => (
                        <tr key={invoice.id}>
                            <td className="border border-gray-300 p-2">{invoice.id}</td>
                            <td className="border border-gray-300 p-2">{invoice.clientName}</td>
                            <td className="border border-gray-300 p-2">{new Date(invoice.date).toLocaleDateString()}</td>
                            <td className="border border-gray-300 p-2">{invoice.total.toFixed(2)} €</td>
                            <td className="border border-gray-300 p-2">
                                <button className="text-blue-500 hover:underline">Ver</button>
                                <button className="text-red-500 hover:underline ml-2">Eliminar</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default InvoiceList;