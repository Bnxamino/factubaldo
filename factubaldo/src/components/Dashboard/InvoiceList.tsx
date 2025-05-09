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
            <h2>Facturas Recientes</h2>
            <table className="min-w-full bg-white">
                <thead>
                    <tr>
                        <th className="py-2 px-4 border-b">ID</th>
                        <th className="py-2 px-4 border-b">Cliente</th>
                        <th className="py-2 px-4 border-b">Total</th>
                        <th className="py-2 px-4 border-b">Fecha</th>
                        <th className="py-2 px-4 border-b">Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {invoices.map((invoice: Invoice) => (
                        <tr key={invoice.id}>
                            <td className="py-2 px-4 border-b">{invoice.id}</td>
                            <td className="py-2 px-4 border-b">{invoice.clientName}</td>
                            <td className="py-2 px-4 border-b">{invoice.total}</td>
                            <td className="py-2 px-4 border-b">{new Date(invoice.createdAt).toLocaleDateString()}</td>
                            <td className="py-2 px-4 border-b">
                                <button className="text-blue-500">Ver</button>
                                <button className="text-red-500 ml-2">Eliminar</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default InvoiceList;