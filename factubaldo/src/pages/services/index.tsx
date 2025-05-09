import { useEffect } from 'react';
import { useServices } from '../../../hooks/useServices';
import ServiceList from '../../../components/Services/ServiceList';
import { useAuth } from '../../../hooks/useAuth';
import ProtectedRoute from '../../../components/Auth/ProtectedRoute';

const ServicesPage = () => {
  const { user } = useAuth();
  const { services, fetchServices } = useServices();

  useEffect(() => {
    if (user) {
      fetchServices();
    }
  }, [user, fetchServices]);

  return (
    <ProtectedRoute>
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Servicios</h1>
        <ServiceList services={services} />
      </div>
    </ProtectedRoute>
  );
};

export default ServicesPage;