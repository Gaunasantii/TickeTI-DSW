import { Routes, Route } from 'react-router';
import { LoginForm } from './components/LoginForm';
import { Dashboard } from './components/Dashboard';
import { FormularioOficina } from './components/FormularioOficina';
import { ListaEmpresas } from './components/ListaEmpresas';
import { OficinasDeEmpresa } from './components/OficinasDeEmpresa';
import { ListaCategorias } from './components/ListaCategorias';
import { ListaPrioridades } from './components/ListaPrioridades';
import { ListaUsuarios } from './components/ListaUsuarios';
import { TicketForm } from './components/TicketForm.jsx'

export const App = () => {
  return (
    <Routes>
      <Route path="/" element={<LoginForm />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/empresas" element={<ListaEmpresas />} />
      <Route path="/empresas/:empresaId/oficinas" element={<OficinasDeEmpresa />} />
      <Route path="/nueva-oficina" element={<FormularioOficina />} />
      <Route path="/categorias" element={<ListaCategorias />} />
      <Route path="/prioridades" element={<ListaPrioridades />} />
      <Route path="/usuarios" element={<ListaUsuarios />} />
      <Route path="/tickets" element={<TicketForm />} />
    </Routes>
  );
};

export default App;