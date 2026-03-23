const API_URL = 'http://localhost:3000/api';

export const ticketService = {
  // Función para guardar un ticket en la DB
  crearTicket: async (ticketData) => {
    const response = await fetch(`${API_URL}/tickets`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(ticketData),
    });
    
    if (!response.ok) {
      // Intentamos obtener el detalle del error que manda el Back (Sequelize)
      const errorData = await response.json();
      console.log("Detalle del error desde el Back:", errorData);
      throw new Error(errorData.details || 'Error al guardar el ticket');
    }
    
    return await response.json();
  }
};