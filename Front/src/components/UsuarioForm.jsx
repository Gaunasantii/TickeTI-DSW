import { useState } from 'react';
import { usuarioService } from '../services/api';

const UsuarioForm = () => {
  const [formData, setFormData] = useState({
    dni: '',
    apellido: '',
    nombre: '',
    telefono: '',
    pass:'',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const resultado = await usuarioService.crearUsuario(formData);
      alert('Usuario guardado con exito: ' + resultado.titulo);
      
      // Limpiar formulario dejando los valores por defecto
      setFormData({ 
        dni: '',
        apellido: '',
        nombre: '',
        telefono: '',
        pass: '',
      });
    } catch (error) {
      alert('Error: ' + error.message);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-xl shadow-md border border-gray-200">
      <h2 className="text-2xl font-bold mb-5 text-gray-800">Registrar Usuario</h2>
      <form onSubmit={handleSubmit} className="space-y-4">

        {/* DNI */}
        <div>
          <label className="block text-sm font-medium text-gray-700">DNI</label>
          <input 
            type="text" 
            className="mt-1 block w-full border border-gray-300 rounded-md p-2 shadow-sm focus:ring-blue-500 focus:border-blue-500"
            value={formData.dni}
            onChange={(e) => setFormData({...formData, dni: e.target.value})}
            required
          />
          <p className="text-[10px] text-gray-400 mt-1">* Se utilizará para identificar el usuario en el sistema.</p>
        </div>
        
        {/* Nombre */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Nombre</label>
          <textarea
            className="mt-1 block w-full border border-gray-300 rounded-md p-2 shadow-sm focus:ring-blue-500 focus:border-blue-500"
            value={formData.nombre}
            onChange={(e) => setFormData({...formData, nombre: e.target.value})}
            required
          />
        </div>

        {/* Apellido */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Apellido</label>
          <textarea
            className="mt-1 block w-full border border-gray-300 rounded-md p-2 shadow-sm focus:ring-blue-500 focus:border-blue-500"
            value={formData.apellido}
            onChange={(e) => setFormData({...formData, apellido: e.target.value})}
            required
          />
        </div>

        {/* TELEFONO */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Telefono</label>
          <input 
            type="text" 
            className="mt-1 block w-full border border-gray-300 rounded-md p-2 shadow-sm focus:ring-blue-500 focus:border-blue-500"
            value={formData.telefono}
            onChange={(e) => setFormData({...formData, telefono: e.target.value})}
            required
          />
        </div>

        {/* Contraseña */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Contraseña</label>
          <input
            type="password"
            className="mt-1 block w-full border border-gray-300 rounded-md p-2 shadow-sm focus:ring-blue-500 focus:border-blue-500"
            value={formData.pass}
            onChange={(e) => setFormData({ ...formData, pass: e.target.value })}
            required
            placeholder="Ingrese una contraseña temporal"
          />
        </div>

        <button 
          type="submit" 
          className="w-full bg-blue-600 text-white font-bold py-2 px-4 rounded-md hover:bg-blue-700 transition duration-300 shadow-sm"
        >
          Guardar Usuario
        </button>
      </form>
    </div>
  );
};

export default UsuarioForm;