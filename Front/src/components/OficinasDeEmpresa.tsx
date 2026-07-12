import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router';

export const OficinasDeEmpresa = () => {
  const { empresaId } = useParams();
  const navigate = useNavigate();
  const [oficinas, setOficinas] = useState<any[]>([]);

  const cargarOficinas = () => {
    fetch(`http://localhost:3000/api/oficinas`)
      .then((res) => res.json())
      .then((data) => {
        const filtradas = data.data.filter(
          (ofi: any) => String(ofi.empresa) === String(empresaId)
        );
        setOficinas(filtradas);
      })
      .catch((err) => console.error("Error:", err));
  };

  useEffect(() => {
    cargarOficinas();
  }, [empresaId]);

  const eliminar = async (id: number) => {
    try {
      const res = await fetch(`http://localhost:3000/api/oficinas/${id}`, {
        method: 'DELETE',
      });
      if (res.ok) {
        cargarOficinas();
      } else {
        alert("No se pudo eliminar.");
      }
    } catch (err) {
      console.error("Error:", err);
    }
  };

  return (
    <div className="container">
      <h1>Oficinas de la empresa</h1>
      <button onClick={() => navigate(`/nueva-oficina?empresa=${empresaId}`)}>
        + Agregar oficina
      </button>

      <ul>
        {oficinas.map((ofi: any) => (
          <li key={ofi.id}>
            {ofi.nombre}
            <button onClick={() => eliminar(ofi.id)}>Eliminar</button>
          </li>
        ))}
      </ul>
    </div>
  );
};