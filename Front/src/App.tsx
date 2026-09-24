import { Routes, Route } from "react-router";
import { Dashboard } from "./components/Dashboard";
import { ListaEmpresas } from "./components/ListaEmpresas";
import { OficinasDeEmpresa } from "./components/OficinasDeEmpresa";
import { ListaCategorias } from "./components/ListaCategorias";
import { ListaPrioridades } from "./components/ListaPrioridades";
import { ListaUsuarios } from "./components/ListaUsuarios";
import { TicketForm } from "./components/TicketForm.jsx";
import { HomePage } from "./pages/Home/Home.js";
import { ContactPage } from "./pages/Contact/Contact";
import { LoginPage } from "./pages/Login/Login.js";
import { OficinaPage } from "./pages/Oficina/Oficina.js";
import { UserDashboardPage } from "./pages/Usuario/Usuario";
import { AdminPage } from "./pages/Admin/Admin";
import { TecnicoPage } from "./pages/Tecnico/Tecnico";
import { ProtectedRoute } from "./components/ProtectedRoute";

export const App = () => {
  return (
    <Routes>
      {/* Rutas Públicas */}
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/contact" element={<ContactPage />} />

      {/* Rutas Protegidas - Solo Administrador */}
      <Route element={<ProtectedRoute rolesPermitidos={["admin", "administrador"]} />}>
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/empresas" element={<ListaEmpresas />} />
        <Route path="/empresas/:empresaId/oficinas" element={<OficinasDeEmpresa />} />
        <Route path="/Oficina" element={<OficinaPage />} />
        <Route path="/categorias" element={<ListaCategorias />} />
        <Route path="/prioridades" element={<ListaPrioridades />} />
        <Route path="/usuarios" element={<ListaUsuarios />} />
      </Route>

      {/* Rutas Protegidas - Solo Técnico */}
      <Route element={<ProtectedRoute rolesPermitidos={["tecnico"]} />}>
        <Route path="/tecnico" element={<TecnicoPage />} />
      </Route>

      {/* Rutas Protegidas - Usuario/Solicitante (y roles superiores con acceso a crear) */}
      <Route element={<ProtectedRoute rolesPermitidos={["usuario", "solicitante", "cliente", "admin", "administrador"]} />}>
        <Route path="/usuario" element={<UserDashboardPage />} />
      </Route>
    </Routes>
  );
};