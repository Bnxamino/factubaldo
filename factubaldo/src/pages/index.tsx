import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '../hooks/useAuth';

const Home = () => {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push('/auth/login');
    }
  }, [loading, user, router]);

  return (
    <div className="flex items-center justify-center h-screen">
      <h1 className="text-4xl font-bold">Bienvenido a la Aplicación de Facturación</h1>
    </div>
  );
};

export default Home;