import { useEffect } from 'react';
import { useInvoices } from '../../hooks/useInvoices';
import InvoiceList from '../../components/Invoices/InvoiceList';
import ProtectedRoute from '../../components/Auth/ProtectedRoute';

const InvoicesPage = () => {
  const { invoices, fetchInvoices } = useInvoices();

  useEffect(() => {
    fetchInvoices();
  }, [fetchInvoices]);

  return (
    <ProtectedRoute>
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Lista de Facturas</h1>
        <InvoiceList invoices={invoices} />
      </div>
    </ProtectedRoute>
  );
};

export default InvoicesPage;