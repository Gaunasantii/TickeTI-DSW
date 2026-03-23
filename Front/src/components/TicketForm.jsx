import { useState } from 'react';
import { ticketService } from '../services/api';

const TicketForm = () => {
  const [formData, setFormData] = useState({
    titulo: '',
    descripcion: '',
    prioridad: 'Baja', // Valor por defecto
    categoria: 'Hardware',
    estado: 'Abierto',
    dni: '' // Agregamos DNI al estado inicial
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Mandamos el formData que ahora incluye DNI y no pide Email
      const resultado = await ticketService.crearTicket(formData);
      alert('Ticket guardado con éxito: ' + resultado.titulo);
      
      // Limpiar formulario dejando los valores por defecto
      setFormData({ 
        titulo: '', 
        descripcion: '', 
        prioridad: 'Baja', 
        categoria: 'Hardware', 
        estado: 'Abierto',
        dni: '' 
      });
    } catch (error) {
      alert('Error: ' + error.message);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-xl shadow-md border border-gray-200">
      <h2 className="text-2xl font-bold mb-5 text-gray-800">Registrar Ticket</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        
        {/* Título */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Título</label>
          <input 
            type="text" 
            className="mt-1 block w-full border border-gray-300 rounded-md p-2 shadow-sm focus:ring-blue-500 focus:border-blue-500"
            value={formData.titulo}
            onChange={(e) => setFormData({...formData, titulo: e.target.value})}
            required
            placeholder="Ej: No funciona el monitor"
          />
        </div>

        {/* Descripción */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Descripción</label>
          <textarea
            className="mt-1 block w-full border border-gray-300 rounded-md p-2 shadow-sm focus:ring-blue-500 focus:border-blue-500"
            value={formData.descripcion}
            onChange={(e) => setFormData({...formData, descripcion: e.target.value})}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Categoría</label>
          <select
            className="mt-1 block w-full border border-gray-300 rounded-md p-2 shadow-sm focus:ring-blue-500 focus:border-blue-500 bg-white"
            value={formData.categoria}
            onChange={(e) => setFormData({...formData, categoria: e.target.value})}
            required
  >
    <       option value="Hardware">Hardware</option>
            <option value="Software">Software</option>
            <option value="Redes">Redes</option>
            <option value="Accesos">Accesos</option>
          </select>
        </div>

        {/* Prioridad - SOLUCIONADO: Agregamos las opciones */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Prioridad</label>
          <select
            className="mt-1 block w-full border border-gray-300 rounded-md p-2 shadow-sm focus:ring-blue-500 focus:border-blue-500 bg-white"
            value={formData.prioridad}
            onChange={(e) => setFormData({...formData, prioridad: e.target.value})}
            required
          >
            <option value="Baja">Baja</option>
            <option value="Media">Media</option>
            <option value="Alta">Alta</option>
            <option value="Urgente">Urgente</option>
          </select>
        </div>

        {/* DNI - El único dato personal que pedimos */}
        <div>
          <label className="block text-sm font-medium text-gray-700">DNI del Solicitante</label>
          <input 
            type="text" 
            className="mt-1 block w-full border border-gray-300 rounded-md p-2 shadow-sm focus:ring-blue-500 focus:border-blue-500"
            value={formData.dni}
            onChange={(e) => setFormData({...formData, dni: e.target.value})}
            required
            placeholder="Ingrese DNI para vincular sus datos"
          />
          <p className="text-[10px] text-gray-400 mt-1">* Se utilizará para identificar su usuario en el sistema.</p>
        </div>

        <button 
          type="submit" 
          className="w-full bg-blue-600 text-white font-bold py-2 px-4 rounded-md hover:bg-blue-700 transition duration-300 shadow-sm"
        >
          Guardar Ticket
        </button>
      </form>
    </div>
  );
};

export default TicketForm;