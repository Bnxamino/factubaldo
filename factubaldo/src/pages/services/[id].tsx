import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { supabase } from '../../lib/supabaseClient';
import ServiceForm from '../../components/Services/ServiceForm';
import { Service } from '../../types/service';

const ServicePage = () => {
  const router = useRouter();
  const { id } = router.query;
  const [service, setService] = useState<Service | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchService = async () => {
      if (id) {
        const { data, error } = await supabase
          .from('servicios')
          .select('*')
          .eq('id', id)
          .single();

        if (error) {
          console.error('Error fetching service:', error);
        } else {
          setService(data);
        }
        setLoading(false);
      }
    };

    fetchService();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!service) {
    return <div>Service not found</div>;
  }

  return (
    <div>
      <h1>Edit Service</h1>
      <ServiceForm service={service} />
    </div>
  );
};

export default ServicePage;