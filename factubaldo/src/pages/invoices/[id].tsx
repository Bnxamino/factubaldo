import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { supabase } from '../../lib/supabaseClient';
import InvoiceForm from '../../components/Invoices/InvoiceForm';
import { Invoice } from '../../types/invoice';

const InvoicePage = () => {
  const router = useRouter();
  const { id } = router.query;
  const [invoice, setInvoice] = useState<Invoice | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInvoice = async () => {
      if (id) {
        const { data, error } = await supabase
          .from('facturas')
          .select('*')
          .eq('id', id)
          .single();

        if (error) {
          console.error('Error fetching invoice:', error);
        } else {
          setInvoice(data);
        }
        setLoading(false);
      }
    };

    fetchInvoice();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!invoice) {
    return <div>Invoice not found</div>;
  }

  return (
    <div>
      <h1>Edit Invoice</h1>
      <InvoiceForm invoice={invoice} />
    </div>
  );
};

export default InvoicePage;