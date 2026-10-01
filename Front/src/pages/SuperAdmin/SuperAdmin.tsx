import React, { useEffect, useState } from "react";
import { Link } from "react-router";
import { DashboardLayout } from "../../components/Layout/DashboardLayout";
import { api } from "../../services/api";

export const SuperAdminPage: React.FC = () => {
  const [totalEmpresas, setTotalEmpresas] = useState<number>(0);
  const [totalAdmins, setTotalAdmins] = useState<number>(0);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const cargarMetricas = async () => {
      try {
        const [resEmp, resAdm] = await Promise.allSettled([
          api("/empresas").then((r) => (r.ok ? r.json() : [])),
          api("/admins").then((r) => (r.ok ? r.json() : [])),
        ]);

        const getLen = (res: any) => {
          if (res.status !== "fulfilled") return 0;
          const val = res.value;
          if (Array.isArray(val)) return val.length;
          if (Array.isArray(val?.data)) return val.data.length;
          return 0;
        };

        setTotalEmpresas(getLen(resEmp));
        setTotalAdmins(getLen(resAdm));
      } catch (err) {
        console.error("Error cargando dashboard superadmin:", err);
      } finally {
        setCargando(false);
      }
    };

    cargarMetricas();
  }, []);

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Panel Super Administrador</h1>
          <p className="text-sm text-slate-500">
            Control global del sistema multitenant y gestión de empresas clientes.
          </p>
        </div>

        {/* Tarjetas de Métricas */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                Empresas Registradas
              </p>
              <p className="text-3xl font-extrabold text-slate-800 mt-1">
                {cargando ? "..." : totalEmpresas}
              </p>
            </div>
            <Link
              to="/empresas"
              className="px-4 py-2 text-xs font-semibold text-blue-600 bg-blue-50 border border-blue-100 rounded-xl hover:bg-blue-100 transition"
            >
              Gestionar →
            </Link>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                Administradores Activos
              </p>
              <p className="text-3xl font-extrabold text-slate-800 mt-1">
                {cargando ? "..." : totalAdmins}
              </p>
            </div>
            <Link
              to="/empresas"
              className="px-4 py-2 text-xs font-semibold text-purple-600 bg-purple-50 border border-purple-100 rounded-xl hover:bg-purple-100 transition"
            >
              Ver nómina →
            </Link>
          </div>
        </div>

        {/* Acceso Rápido */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-6 rounded-2xl text-white shadow-sm flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h2 className="text-lg font-bold">Gestión Integral de Empresas</h2>
            <p className="text-xs text-blue-100 mt-1 max-w-md">
              Crea nuevas empresas y asigna de inmediato el administrador responsable para el despliegue del servicio.
            </p>
          </div>
          <Link
            to="/empresas"
            className="px-5 py-2.5 bg-white text-blue-600 font-semibold text-sm rounded-xl shadow-sm hover:bg-blue-50 transition shrink-0"
          >
            + Nueva Empresa
          </Link>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default SuperAdminPage;