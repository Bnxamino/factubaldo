import { useState } from 'react';
import useServices from '../../../factubaldo/src/hooks/useServices';

const InvoiceForm = () => {
  const { addService } = useServices();
  const [newService, setNewService] = useState({
    nombre: '',
    descripcion: '',
    precio_unitario: 0,
    iva: 0,
  });
  const [showNewServiceForm, setShowNewServiceForm] = useState(false);

  const handleNewServiceSubmit = async (e) => {
    e.preventDefault();
    await addService(newService);
    setNewService({ nombre: '', descripcion: '', precio_unitario: 0, iva: 0 });
    setShowNewServiceForm(false);
  };

  return (
    <div>
      <h3>Crear nuevo servicio</h3>
      {showNewServiceForm && (
        <form onSubmit={handleNewServiceSubmit}>
          <input
            type="text"
            placeholder="Nombre del servicio"
            value={newService.nombre}
            onChange={(e) => setNewService({ ...newService, nombre: e.target.value })}
          />
          <input
            type="text"
            placeholder="Descripción"
            value={newService.descripcion}
            onChange={(e) => setNewService({ ...newService, descripcion: e.target.value })}
          />
          <input
            type="number"
            placeholder="Precio unitario"
            value={newService.precio_unitario}
            onChange={(e) => setNewService({ ...newService, precio_unitario: parseFloat(e.target.value) })}
          />
          <input
            type="number"
            placeholder="IVA (%)"
            value={newService.iva}
            onChange={(e) => setNewService({ ...newService, iva: parseFloat(e.target.value) })}
          />
          <button type="submit">Crear servicio</button>
        </form>
      )}
      <button onClick={() => setShowNewServiceForm(!showNewServiceForm)}>
        {showNewServiceForm ? 'Cancelar' : 'Crear nuevo servicio'}
      </button>
    </div>
  );
};

export default InvoiceForm;