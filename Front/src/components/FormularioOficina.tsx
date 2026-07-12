import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router';

export const FormularioOficina = () => {
  const [searchParams] = useSearchParams();
  const empresaIdPreseleccionado = searchParams.get('empresa') || '';

  const [nombre, setNombre] = useState('');
  const [empresaId, setEmpresaId] = useState(empresaIdPreseleccionado);
  const [empresas, setEmpresas] = useState<any[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('http://localhost:3000/api/empresas')
      .then((res) => res.json())
      .then((data) => setEmpresas(data.data))
      .catch((err) => console.error("Error cargando empresas:", err));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const dataToSend = {
      nombre: nombre,
      empresa_id: parseInt(empresaId),
    };

    const response = await fetch('http://localhost:3000/api/oficinas', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(dataToSend),
    });

    if (response.ok) {
      alert("Oficina creada con éxito");
      navigate(`/empresas/${empresaId}/oficinas`);
    } else {
      alert("Error al crear oficina");
    }
  };

  return (
    <div className="form-container">
      <h2>Nueva Oficina</h2>
      <form onSubmit={handleSubmit}>
        <input
          placeholder="Nombre de la oficina"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          required
        />

        <select
          value={empresaId}
          onChange={(e) => setEmpresaId(e.target.value)}
          required
        >
          <option value="">Seleccione una empresa</option>
          {empresas.map((emp) => (
            <option key={emp.id} value={emp.id}>
              {emp.nombre}
            </option>
          ))}
        </select>

        <button type="submit" className="btn">Guardar</button>
      </form>
    </div>
  );
};