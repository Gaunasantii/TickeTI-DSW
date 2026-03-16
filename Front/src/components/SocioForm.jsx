import { useState } from 'react';
import { socioService } from '../services/api';

const SocioForm = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    dni: '',
    email: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const resultado = await socioService.crearSocio(formData);
      alert('Socio guardado con éxito: ' + resultado.nombre);
      // Limpiar formulario
      setFormData({ nombre: '', apellido: '', dni: '', email: '' });
    } catch (error) {
      alert('Error: ' + error.message);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-xl shadow-md border border-gray-200">
      <h2 className="text-2xl font-bold mb-5 text-gray-800">Registrar Socio</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Nombre</label>
          <input 
            type="text" 
            className="mt-1 block w-full border border-gray-300 rounded-md p-2 shadow-sm focus:ring-blue-500 focus:border-blue-500"
            value={formData.nombre}
            onChange={(e) => setFormData({...formData, nombre: e.target.value})}
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Apellido</label>
          <input 
            type="text" 
            className="mt-1 block w-full border border-gray-300 rounded-md p-2 shadow-sm"
            value={formData.apellido}
            onChange={(e) => setFormData({...formData, apellido: e.target.value})}
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">DNI</label>
          <input 
            type="text" 
            className="mt-1 block w-full border border-gray-300 rounded-md p-2 shadow-sm"
            value={formData.dni}
            onChange={(e) => setFormData({...formData, dni: e.target.value})}
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Email</label>
          <input 
            type="email" 
            className="mt-1 block w-full border border-gray-300 rounded-md p-2 shadow-sm"
            value={formData.email}
            onChange={(e) => setFormData({...formData, email: e.target.value})}
            required
          />
        </div>
        <button 
          type="submit" 
          className="w-full bg-blue-600 text-white font-bold py-2 px-4 rounded-md hover:bg-blue-700 transition duration-300"
        >
          Guardar Socio
        </button>
      </form>
    </div>
  );
};

export default SocioForm;