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
      // Intentamos obtener el detalle del error que manda el Back (Sequelize)
      const errorData = await response.json();
      console.log("Detalle del error desde el Back:", errorData);
      throw new Error(errorData.details || 'Error al guardar el socio');
    }
    
    return await response.json();
  }
};