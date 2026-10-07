import React, { useEffect, useState } from "react";
import { ListarOficinas } from "../services/OficinaService/ListarOficina";

interface OficinaItem {
  id: number | string;
  nombre: string;
}

interface UsuarioFormProps {
  onSubmit: (data: any) => Promise<void>;
  cargando?: boolean;
}

export const UsuarioForm: React.FC<UsuarioFormProps> = ({ onSubmit, cargando }) => {
  const [dni, setDni] = useState("");
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [telefono, setTelefono] = useState("");
  const [oficinaId, setOficinaId] = useState<string>("");
  const [oficinas, setOficinas] = useState<OficinaItem[]>([]);

  useEffect(() => {
    const fetchOficinas = async () => {
      try {
        const res: any = await ListarOficinas();
        const lista = res?.data || (Array.isArray(res) ? res : []);
        setOficinas(lista);
      } catch (err) {
        console.error("Error al cargar oficinas:", err);
      }
    };
    fetchOficinas();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit({
      dni,
      nombre,
      apellido,
      telefono,
      oficina: oficinaId ? Number(oficinaId) : undefined,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-slate-600 uppercase mb-1">DNI</label>
          <input
            type="text"
            required
            value={dni}
            onChange={(e) => setDni(e.target.value)}
            className="w-full px-3.5 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-600 uppercase mb-1">Oficina / Área</label>
          <select
            value={oficinaId}
            onChange={(e) => setOficinaId(e.target.value)}
            className="w-full px-3.5 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white text-slate-700"
          >
            <option value="">Seleccionar Oficina (Opcional)</option>
            {oficinas.map((of) => (
              <option key={of.id} value={of.id}>
                {of.nombre}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-600 uppercase mb-1">Nombre</label>
          <input
            type="text"
            required
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            className="w-full px-3.5 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-600 uppercase mb-1">Apellido</label>
          <input
            type="text"
            required
            value={apellido}
            onChange={(e) => setApellido(e.target.value)}
            className="w-full px-3.5 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-600 uppercase mb-1">Teléfono</label>
          <input
            type="text"
            value={telefono}
            onChange={(e) => setTelefono(e.target.value)}
            className="w-full px-3.5 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white"
          />
        </div>
      </div>

      <div className="flex justify-end pt-2">
        <button
          type="submit"
          disabled={cargando}
          className="px-5 py-2 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-xl transition disabled:opacity-50"
        >
          {cargando ? "Guardando..." : "Registrar Usuario"}
        </button>
      </div>
    </form>
  );
};