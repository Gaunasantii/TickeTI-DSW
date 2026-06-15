import { useState } from 'react';
import { oficinaService } from '../services/api';
import './OficinaForm.css';

export const FormularioOficina = () => {
  const [formData, setFormData] = useState({ nombre: '', empresa_id: '' });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const dataToSend = {
        nombre: formData.nombre,
        empresa_id: parseInt(formData.empresa_id) 
      };
      
      await oficinaService.crearOficina(dataToSend);
      alert('Oficina creada con éxito');
      setFormData({ nombre: '', empresa_id: '' });
    } catch (error) { 
      console.error(error);
      alert('Error al crear oficina'); 
    }
  };
  return (
    <div className="form-container">
      <h2>Nueva Oficina</h2>
      <form onSubmit={handleSubmit}>
        <input className="input" placeholder="Nombre" value={formData.nombre} onChange={(e) => setFormData({...formData, nombre: e.target.value})} />
        <input className="input" placeholder="ID Empresa" value={formData.empresa_id} onChange={(e) => setFormData({...formData, empresa_id: e.target.value})} />
        <button type="submit" className="btn">Guardar</button>
      </form>
    </div>
  );
};