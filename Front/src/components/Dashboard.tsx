import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import './Dashboard.css'; // <--- Importante

export const Dashboard = () => {
  const navigate = useNavigate();
  const [usuario, setUsuario] = useState<any>(null);

  useEffect(() => {
    const userString = localStorage.getItem('usuarioTickeTI');
    if (!userString) { navigate('/'); return; }
    setUsuario(JSON.parse(userString));
  }, []);

  if (!usuario) return <div style={{textAlign: 'center', marginTop: '20px'}}>Cargando perfil...</div>;

  return (
    <div className="dashboard-page">
      <div className="dashboard-card">
        <div className="header">
          <h1 className="title">Bienvenido {usuario.name || usuario.mail}!</h1>
          <button onClick={() => { localStorage.removeItem('usuarioTickeTI'); navigate('/'); }} className="logout-btn">
            Cerrar Sesión
          </button>
        </div>

        {usuario.type === 'admin' && (
          <div className="panel admin-panel">
            <h2>Panel de Administración</h2>
            <p>Tenés acceso total al sistema de TickeTI.</p>
            <div className="button-group">
              <button onClick={() => navigate('/usuarios')} className="btn btn-primary">Gestionar Usuarios</button>
              <button className="btn btn-secondary">Ver Todos los Tickets</button>
            </div>
          </div>
        )}

        {usuario.type === 'tecnico' && (
          <div className="panel tech-panel">
            <h2>Panel de Técnico</h2>
            <p>Revisá los tickets asignados a tu cola de trabajo.</p>
            <button className="btn btn-primary">Ver Mis Tickets Asignados</button>
          </div>
        )}

        {(usuario.type === 'usuario' || !usuario.type) && (
          <div className="panel user-panel">
            <h2>Portal de Soporte</h2>
            <p>¿Tenés algún problema con tu equipo o el sistema?</p>
            <button onClick={() => navigate('/tickets')} className="btn btn-primary">Crear Nuevo Ticket</button>
          </div>
        )}
      </div>
    </div>
  );
};