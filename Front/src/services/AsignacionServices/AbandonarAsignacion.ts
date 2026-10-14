import {api} from '../api'

export const abandonarAsignacion = async(id:number|string)=>{
    const response = await api(`/Mis-asignaciones/${id}/abandonar`, {
        method: 'POST'
    });
    
    if(!response.ok) throw new Error("Error al abandonar la asignacion:"+JSON.stringify((await response.json()).errors));

    return await response.json();
}
