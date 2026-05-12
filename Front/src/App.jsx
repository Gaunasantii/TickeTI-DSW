import { useState, useEffect } from 'react';
import { LoginForm } from './components/LoginForm';
import UsuarioForm from './components/UsuarioForm';
import TicketForm from './components/TicketForm';
// Importá también el TicketList cuando lo tengas

function App() {
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-4xl font-extrabold text-center text-gray-900 mb-10">
        TickeTI - Soporte Técnico
      </h1>
      <LoginForm/>      
    </div>
  )
}

export default App;
