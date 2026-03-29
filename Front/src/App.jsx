import TicketForm from './components/TicketForm'
import UsuarioForm from './components/UsuarioForm'

function App() {
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-4xl font-extrabold text-center text-gray-900 mb-10">
        Ticket
      </h1>
      <TicketForm/>      
    </div>
  )
}

export default App