import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import { Invoice } from '../types/invoice';

const useInvoices = () => {
    const [invoices, setInvoices] = useState<Invoice[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchInvoices = async () => {
            try {
                setLoading(true);
                const { data, error } = await supabase
                    .from('facturas')
                    .select('*');

                if (error) throw error;

                setInvoices(data);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchInvoices();
    }, []);

    const createInvoice = async (invoice: Invoice) => {
        try {
            const { data, error } = await supabase
                .from('facturas')
                .insert([invoice]);

            if (error) throw error;

            setInvoices([...invoices, ...data]);
        } catch (error) {
            setError(error.message);
        }
    };

    const updateInvoice = async (id: string, updatedInvoice: Partial<Invoice>) => {
        try {
            const { data, error } = await supabase
                .from('facturas')
                .update(updatedInvoice)
                .eq('id', id);

            if (error) throw error;

            setInvoices(invoices.map(invoice => (invoice.id === id ? { ...invoice, ...data[0] } : invoice)));
        } catch (error) {
            setError(error.message);
        }
    };

    const deleteInvoice = async (id: string) => {
        try {
            const { error } = await supabase
                .from('facturas')
                .delete()
                .eq('id', id);

            if (error) throw error;

            setInvoices(invoices.filter(invoice => invoice.id !== id));
        } catch (error) {
            setError(error.message);
        }
    };

    return {
        invoices,
        loading,
        error,
        createInvoice,
        updateInvoice,
        deleteInvoice,
    };
};

export default useInvoices;