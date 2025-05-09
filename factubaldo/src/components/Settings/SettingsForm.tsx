import React, { useState } from 'react';

const SettingsForm = () => {
    const [companyName, setCompanyName] = useState('');
    const [email, setEmail] = useState('');
    const [logo, setLogo] = useState<File | null>(null);
    const [defaultCurrency, setDefaultCurrency] = useState('');
    const [defaultVAT, setDefaultVAT] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Aquí se manejaría la lógica para guardar la configuración
        console.log({
            companyName,
            email,
            logo,
            defaultCurrency,
            defaultVAT,
        });
    };

    const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setLogo(e.target.files[0]);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label className="block text-sm font-medium text-gray-700">Nombre de la empresa</label>
                <input
                    type="text"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                    required
                />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                    required
                />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700">Logo</label>
                <input
                    type="file"
                    accept="image/*"
                    onChange={handleLogoChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700">Moneda por defecto</label>
                <input
                    type="text"
                    value={defaultCurrency}
                    onChange={(e) => setDefaultCurrency(e.target.value)}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                    required
                />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700">Tipo de IVA general (%)</label>
                <input
                    type="number"
                    value={defaultVAT}
                    onChange={(e) => setDefaultVAT(e.target.value)}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                    required
                />
            </div>
            <button type="submit" className="mt-4 w-full bg-blue-600 text-white p-2 rounded-md">
                Guardar Configuración
            </button>
        </form>
    );
};

export default SettingsForm;