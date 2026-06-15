import { Routes, Route } from 'react-router';
import { LoginForm } from './components/LoginForm';
import { Dashboard } from './components/Dashboard';
import { FormularioOficina } from './components/FormularioOficina';

function App() {
  return (
    <Routes>
      <Route path="/" element={<LoginForm />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/nueva-oficina" element={<FormularioOficina />} />
    </Routes>
  );
}

export default App;