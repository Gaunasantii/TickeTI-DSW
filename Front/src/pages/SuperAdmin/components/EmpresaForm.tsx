import React, { useState, useEffect } from "react";
import { api } from "../../../services/api";
import { EmpresaPaginatedModel } from "../../../models/empresaPaginated.model";

interface EmpresaFormProps {
  empresaAEditar?: EmpresaPaginatedModel | null;
  onSuccess: () => void;
  onCancel: () => void;
}

export const EmpresaForm: React.FC<EmpresaFormProps> = ({
  empresaAEditar,
  onSuccess,
  onCancel,
}) => {
  const [nombreEmpresa, setNombreEmpresa] = useState(empresaAEditar?.nombre || "");

  // Datos del admin
  const [dniAdmin, setDniAdmin] = useState("");
  const [nombreAdmin, setNombreAdmin] = useState("");
  const [apellidoAdmin, setApellidoAdmin] = useState("");
  const [telefonoAdmin, setTelefonoAdmin] = useState("");
  const [passAdmin, setPassAdmin] = useState("");

  const [guardando, setGuardando] = useState(false);

  useEffect(() => {
    if (empresaAEditar) {
      setNombreEmpresa(empresaAEditar.nombre);
    }
  }, [empresaAEditar]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!nombreEmpresa.trim()) {
      alert("Por favor ingresá el nombre o razón social de la empresa.");
      return;
    }

    try {
      setGuardando(true);
      let targetId = empresaAEditar?.id;

      // 1. Crear o Modificar Empresa
      if (empresaAEditar && targetId) {
        // Modificación
        const resMod = await api(`/empresas/${targetId}`, {
          method: "PUT",
          body: JSON.stringify({ nombre: nombreEmpresa.trim() }),
        });
        if (!resMod.ok) {
          const err = await resMod.json().catch(() => ({}));
          throw new Error(err.message || "Error al modificar la empresa");
        }
      } else {
        // Alta
        const resEmpresa = await api("/empresas", {
          method: "POST",
          body: JSON.stringify({ nombre: nombreEmpresa.trim() }),
        });

        if (!resEmpresa.ok) {
          const err = await resEmpresa.json().catch(() => ({}));
          throw new Error(err.message || "Error al crear la empresa");
        }

        const jsonCreado = await resEmpresa.json();
        // Extrae el ID numérico independientemente de si viene envuelto en .data o plano
        targetId = Number(jsonCreado?.data?.id ?? jsonCreado?.id);
      }

      // 2. Si se completó el DNI del admin, se crea y asocia con el ID numérico
      if (dniAdmin.trim()) {
        if (!nombreAdmin.trim() || !apellidoAdmin.trim() || !passAdmin.trim()) {
          alert("Completá nombre, apellido y contraseña para el administrador.");
          setGuardando(false);
          return;
        }

        if (!targetId || isNaN(targetId)) {
          alert("No se pudo obtener el ID numérico de la empresa para asociar al admin.");
          setGuardando(false);
          return;
        }

        const adminPayload = {
          dni: dniAdmin.trim(),
          name: nombreAdmin.trim(),
          nombre: nombreAdmin.trim(),
          surName: apellidoAdmin.trim(),
          apellido: apellidoAdmin.trim(),
          tele: telefonoAdmin.trim(),
          telefono: telefonoAdmin.trim(),
          pass: passAdmin.trim(),
          password: passAdmin.trim(),
          empresa: targetId, // <--- Siempre number para satisfacer Zod
        };

        const resAdmin = await api("/admins", {
          method: "POST",
          body: JSON.stringify(adminPayload),
        });

        if (!resAdmin.ok) {
          const errAdmin = await resAdmin.json().catch(() => ({}));
          alert(
            `Operación de empresa completada, pero falló la asignación del admin: ${
              errAdmin.message || "Verificá los datos"
            }`
          );
        }
      }

      onSuccess();
    } catch (err: any) {
      alert(err.message || "Error en la operación");
    } finally {
      setGuardando(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-5">
      <h2 className="text-lg font-bold text-slate-800">
        {empresaAEditar ? "Modificar Empresa" : "Alta Empresa y Administrador (Opcional)"}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="space-y-2">
          <label className="block text-xs font-bold text-slate-500 uppercase">
            Razón Social / Nombre
          </label>
          <input
            type="text"
            required
            value={nombreEmpresa}
            onChange={(e) => setNombreEmpresa(e.target.value)}
            placeholder="Ej: Stark Industries"
            className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white"
          />
        </div>

        <div className="p-4 rounded-xl border border-slate-100 bg-slate-50/50 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase">
              {empresaAEditar ? "Asignar / Crear Nuevo Administrador" : "Administrador (Opcional)"}
            </span>
            <span className="text-xs text-slate-400">
              Podés dejarlo vacío si no deseás agregar uno ahora
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
            <input
              type="text"
              value={dniAdmin}
              onChange={(e) => setDniAdmin(e.target.value)}
              placeholder="DNI Admin"
              className="px-3.5 py-2 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="text"
              value={telefonoAdmin}
              onChange={(e) => setTelefonoAdmin(e.target.value)}
              placeholder="Teléfono"
              className="px-3.5 py-2 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="text"
              value={nombreAdmin}
              onChange={(e) => setNombreAdmin(e.target.value)}
              placeholder="Nombre"
              className="px-3.5 py-2 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="text"
              value={apellidoAdmin}
              onChange={(e) => setApellidoAdmin(e.target.value)}
              placeholder="Apellido"
              className="px-3.5 py-2 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="password"
              value={passAdmin}
              onChange={(e) => setPassAdmin(e.target.value)}
              placeholder="Contraseña del Admin"
              className="sm:col-span-2 px-3.5 py-2 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <div className="flex justify-end gap-2 pt-2">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 text-sm font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-xl transition"
          >
            Cancelar
          </button>
          <button
            type="submit"
            disabled={guardando}
            className="px-5 py-2 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-xl transition disabled:opacity-50"
          >
            {guardando ? "Guardando..." : empresaAEditar ? "Guardar Cambios" : "Registrar Empresa"}
          </button>
        </div>
      </form>
    </div>
  );
};