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

export const usuarioService = {
  // Función para guardar un usuario en la DB
  crearUsuario: async (usuarioData) => {
    const response = await fetch(`${API_URL}/usuarios`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(usuarioData),
    });

    if (!response.ok) {
      // Intentamos obtener el detalle del error que manda el Back (Sequelize)
      const errorData = await response.json();
      console.log("Detalle del error desde el Back:", errorData);
      throw new Error(errorData.details || 'Error al guardar el usuario');
    }

    return await response.json();
  }
};

export const loginService = {
  Login: async(loginData)=>{
    const response = await fetch(`${API_URL}/auth/login`,
      {method:'POST',
        headers:{
          'content-type':'application/json',
        },
        body:JSON.stringify(loginData),
      }
    );

    
    if(!response.ok) {
      const errorData = await response.json();
      console.log("Detalle del error desde el Back:", errorData);
      throw new Error(errorData.details || 'Error al iniciar sesion');
    };
    return await response.json();
  }
}