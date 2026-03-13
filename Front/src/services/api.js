const API_URL = 'http://localhost:3000/api';

export const socioService = {
  // Función para guardar un socio en la DB
  crearSocio: async (socioData) => {
    const response = await fetch(`${API_URL}/socios`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(socioData),
    });
    
    if (!response.ok) {
      throw new Error('Error al guardar el socio');
    }
    
    return await response.json();
  }
};