import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useClients } from '../../hooks/useClients';
import ClientForm from '../../components/Clients/ClientForm';
import ProtectedRoute from '../../components/Auth/ProtectedRoute';

const ClientPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const { client, fetchClient, isLoading, error } = useClients();

  useEffect(() => {
    if (id) {
      fetchClient(id);
    }
  }, [id, fetchClient]);

  if (isLoading) return <div>Cargando...</div>;
  if (error) return <div>Error al cargar el cliente.</div>;

  return (
    <ProtectedRoute>
      <div>
        <h1>Editar Cliente</h1>
        <ClientForm client={client} />
      </div>
    </ProtectedRoute>
  );
};

export default ClientPage;