import { useEffect } from 'react';
import { useAuth } from '../../hooks/useAuth';
import Sidebar from '../../components/Dashboard/Sidebar';
import InvoiceList from '../../components/Dashboard/InvoiceList';

const Dashboard = () => {
  const { user, loading } = useAuth();

  useEffect(() => {
    if (!loading && !user) {
      // Redirigir a la página de inicio de sesión si no hay usuario autenticado
      window.location.href = '/auth/login';
    }
  }, [loading, user]);

  if (loading) {
    return <div>Cargando...</div>;
  }

  return (
    <div className="flex">
      <Sidebar />
      <main className="flex-1 p-4">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <InvoiceList />
      </main>
    </div>
  );
};

export default Dashboard;