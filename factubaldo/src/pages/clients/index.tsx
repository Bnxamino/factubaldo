import { useEffect } from 'react';
import { useClients } from '../../hooks/useClients';
import ClientList from '../../components/Clients/ClientList';
import { useAuth } from '../../hooks/useAuth';
import ProtectedRoute from '../../components/Auth/ProtectedRoute';

const ClientsPage = () => {
  const { clients, fetchClients } = useClients();
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      fetchClients();
    }
  }, [user, fetchClients]);

  return (
    <ProtectedRoute>
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Lista de Clientes</h1>
        <ClientList clients={clients} />
      </div>
    </ProtectedRoute>
  );
};

export default ClientsPage;