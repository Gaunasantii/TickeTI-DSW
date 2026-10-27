import { Routes, Route } from "react-router";
import { CategoriasCrudPage } from "./pages/Categorias/CategoriasCrudPage";
import {UsuarioCrudPage} from "./pages/Usuario/UsuarioCrud.js";
import { HomePage } from "./pages/Home/Home.js";
import { ContactPage } from "./pages/Contact/Contact";
import { LoginPage } from "./pages/Login/Login.js";
import { OficinaPage } from "./pages/Oficina/Oficina.js";
import { UserDashboardPage } from "./pages/Usuario/UsuarioDashboard.js";
import { AdminPage } from "./pages/Admin/AdminDashboard.js";
import { TecnicoPage } from "./pages/Tecnico/TecnicoDashboard.js";
import { SuperAdminPage } from "./pages/SuperAdmin/SuperAdminPage";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { AjustesPage } from "./pages/Ajustes/Ajustes.js";
import { PrioridadCrudPage } from "./pages/Prioridad/PrioridadCrudPage.js";
import { EstadoCrudPage } from "./pages/Estado/EstadoCrudPage.js";
import MisAsignacionesPage from "./pages/Asignaciones/MisAsignacionesPage.js";
import DashboardLayout from "./components/Layout/DashboardLayout.js";
import { GuestLayout } from "./components/Layout/GuestLayout.js";

export const App = () => {
  return (
    <Routes>
      {/* Públicas */}
      <Route element={<GuestLayout></GuestLayout>}>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        {/* <Route path="/contact" element={<ContactPage />} /> */}
      </Route>

      <Route element={<DashboardLayout></DashboardLayout>}>
      {/* Rutas Super Admin */}
      <Route element={<ProtectedRoute rolesPermitidos={["S_ADMIN"]} />}>
        <Route path="/superadmin" element={<SuperAdminPage />} />
      </Route>

      {/* Rutas compartidas Admin y Técnico */}
      <Route element={<ProtectedRoute rolesPermitidos={["admin", "tecnico"]} />}>
        <Route path="/usuarios" element={<UsuarioCrudPage />} />
      </Route>

      {/* Rutas exclusivas Administrador */}
      <Route element={<ProtectedRoute rolesPermitidos={["admin"]} />}>
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/Oficina" element={<OficinaPage />} />
        <Route path="/categorias/crud" element={<CategoriasCrudPage />} />
        <Route path="/prioridades/crud" element={<PrioridadCrudPage />} />
        <Route path="/estados/crud" element={<EstadoCrudPage />} />
      </Route>

      {/* Rutas exclusivas Técnico */}
      <Route element={<ProtectedRoute rolesPermitidos={["tecnico"]} />}>
        <Route path="/tecnico" element={<TecnicoPage />} />
        <Route path="/mis-asignaciones" element={<MisAsignacionesPage />} />
      </Route>

      {/* Rutas Solicitante / Usuario */}
      <Route element={<ProtectedRoute rolesPermitidos={["user", "tecnico"]} />}>
        <Route path="/Mis-tickets" element={<UserDashboardPage />} />
      </Route>
      </Route>
      
      {/* Ruta ajustes para todos los usuarios */}
      <Route element={<ProtectedRoute rolesPermitidos={["user", "usuario", "solicitante", "cliente", "s_admin", "superadmin", "admin", "administrador", "tecnico"]} />}>
        <Route path="/ajustes" element={<AjustesPage />} />
      </Route>
    </Routes>
  );
};

export default App;