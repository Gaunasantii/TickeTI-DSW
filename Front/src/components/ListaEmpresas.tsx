import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';

export const ListaEmpresas = () => {
  const [empresas, setEmpresas] = useState<any[]>([]);
  const [nombre, setNombre] = useState('');
  const [idEditando, setIdEditando] = useState<number | null>(null);
  const navigate = useNavigate();

  const cargarEmpresas = () => {
    fetch('http://localhost:3000/api/empresas')
      .then(res => res.json())
      .then(data => setEmpresas(data.data))
      .catch(err => console.error("Error:", err));
  };

  useEffect(() => { cargarEmpresas(); }, []);

  const eliminar = async (id: number) => {
    await fetch(`http://localhost:3000/api/empresas/${id}`, { method: 'DELETE' });
    cargarEmpresas(); 
  };

  const guardar = async () => {
    const method = idEditando ? 'PUT' : 'POST';
    const url = idEditando ? `http://localhost:3000/api/empresas/${idEditando}` : 'http://localhost:3000/api/empresas';
    
    await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nombre }),
    });
    setNombre('');
    setIdEditando(null);
    cargarEmpresas();
  };

  return (
    <div className="container">
      <h1>Gestión de Empresas</h1>
      
      <div>
        <input value={nombre} onChange={(e) => setNombre(e.target.value)} placeholder="Nombre de empresa" />
        <button onClick={guardar}>{idEditando ? 'Actualizar' : 'Agregar'}</button>
      </div>

      <ul>
        {empresas.map((emp: any) => (
          <li key={emp.id}>
            {emp.nombre}
            <button onClick={() => navigate(`/empresas/${emp.id}/oficinas`)}>
              Gestionar Oficinas
            </button>
            <button onClick={() => { setIdEditando(emp.id); setNombre(emp.nombre); }}>Editar</button>
            <button onClick={() => eliminar(emp.id)}>Eliminar</button>
          </li>
        ))}
      </ul>
    </div>
  );
};