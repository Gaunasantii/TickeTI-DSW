import {api} from '../api';

export const eliminarMiTicket = async (ticketId: number|string) => {
  const response= await api(`/My-tickets/${ticketId}`,{
    method: 'DELETE'
  });

  if(!response.ok) {
    throw new Error("Error al eliminar el ticket:"+JSON.stringify((await response.json()).errors));
  }

  return await response.json();
  
};