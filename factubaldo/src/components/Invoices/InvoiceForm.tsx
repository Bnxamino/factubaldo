import React, { useState, useEffect } from 'react';
import { useInvoices } from '../../hooks/useInvoices';
import { Invoice } from '../../types/invoice';

const InvoiceForm: React.FC<{ invoiceId?: string; onClose: () => void }> = ({ invoiceId, onClose }) => {
    const { createInvoice, updateInvoice, getInvoiceById } = useInvoices();
    const [invoiceData, setInvoiceData] = useState<Invoice>({
        clientId: '',
        items: [],
        total: 0,
        date: new Date().toISOString().split('T')[0],
    });

    useEffect(() => {
        if (invoiceId) {
            const fetchInvoice = async () => {
                const invoice = await getInvoiceById(invoiceId);
                if (invoice) {
                    setInvoiceData(invoice);
                }
            };
            fetchInvoice();
        }
    }, [invoiceId, getInvoiceById]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setInvoiceData({ ...invoiceData, [name]: value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (invoiceId) {
            await updateInvoice(invoiceId, invoiceData);
        } else {
            await createInvoice(invoiceData);
        }
        onClose();
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label htmlFor="clientId" className="block">Cliente</label>
                <input
                    type="text"
                    name="clientId"
                    value={invoiceData.clientId}
                    onChange={handleChange}
                    required
                    className="border rounded p-2 w-full"
                />
            </div>
            <div>
                <label htmlFor="date" className="block">Fecha</label>
                <input
                    type="date"
                    name="date"
                    value={invoiceData.date}
                    onChange={handleChange}
                    required
                    className="border rounded p-2 w-full"
                />
            </div>
            {/* Add more fields for items and total as needed */}
            <button type="submit" className="bg-blue-500 text-white rounded p-2">Guardar</button>
            <button type="button" onClick={onClose} className="bg-gray-300 rounded p-2">Cancelar</button>
        </form>
    );
};

export default InvoiceForm;