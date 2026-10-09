import { Routes, Route } from "react-router";
import { Dashboard } from "./components/Dashboard";
import { ListaEmpresas } from "./components/ListaEmpresas";
import { OficinasDeEmpresa } from "./components/OficinasDeEmpresa";
import { ListaCategorias } from "./components/ListaCategorias";
import { ListaPrioridades } from "./components/ListaPrioridades";
import {UsuarioCrudPage} from "./pages/Usuario/UsuarioCrud.js";
import { HomePage } from "./pages/Home/Home.js";
import { ContactPage } from "./pages/Contact/Contact";
import { LoginPage } from "./pages/Login/Login.js";
import { OficinaPage } from "./pages/Oficina/Oficina.js";
import { UserDashboardPage } from "./pages/Usuario/UsuarioDashboard.js";
import { AdminPage } from "./pages/Admin/AdminDashboard.js";
import { TecnicoPage } from "./pages/Tecnico/TecnicoDashboard.js";
import { SuperAdminPage } from "./pages/SuperAdmin/SuperAdmin";
import { ProtectedRoute } from "./components/ProtectedRoute";

export const App = () => {
  return (
    <Routes>
      {/* Públicas */}
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/contact" element={<ContactPage />} />

      {/* Rutas Super Admin */}
      <Route element={<ProtectedRoute rolesPermitidos={["s_admin", "superadmin"]} />}>
        <Route path="/superadmin" element={<SuperAdminPage />} />
      </Route>

      {/* Rutas compartidas Super Admin y Admin (Empresas) */}
      <Route element={<ProtectedRoute rolesPermitidos={["s_admin", "superadmin", "admin", "administrador"]} />}>
        <Route path="/empresas" element={<ListaEmpresas />} />
        <Route path="/empresas/:empresaId/oficinas" element={<OficinasDeEmpresa />} />
      </Route>

      {/* Rutas compartidas Admin y Técnico */}
      <Route element={<ProtectedRoute rolesPermitidos={["admin", "administrador", "tecnico"]} />}>
        <Route path="/usuarios" element={<UsuarioCrudPage />} />
      </Route>

      {/* Rutas exclusivas Administrador */}
      <Route element={<ProtectedRoute rolesPermitidos={["admin", "administrador"]} />}>
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/Oficina" element={<OficinaPage />} />
        <Route path="/categorias" element={<ListaCategorias />} />
        <Route path="/prioridades" element={<ListaPrioridades />} />
      </Route>

      {/* Rutas exclusivas Técnico */}
      <Route element={<ProtectedRoute rolesPermitidos={["tecnico"]} />}>
        <Route path="/tecnico" element={<TecnicoPage />} />
      </Route>

      {/* Rutas Solicitante / Usuario */}
      <Route element={<ProtectedRoute rolesPermitidos={["user", "usuario", "solicitante", "cliente", "admin", "administrador"]} />}>
        <Route path="/usuario" element={<UserDashboardPage />} />
      </Route>
    </Routes>
  );
};

export default App;