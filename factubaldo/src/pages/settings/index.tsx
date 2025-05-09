import React from 'react';
import SettingsForm from '../../components/Settings/SettingsForm';
import { useAuth } from '../../hooks/useAuth';

const SettingsPage = () => {
    const { user } = useAuth();

    if (!user) {
        return <div>Acceso denegado. Debes iniciar sesión para ver esta página.</div>;
    }

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Configuración</h1>
            <SettingsForm />
        </div>
    );
};

export default SettingsPage;