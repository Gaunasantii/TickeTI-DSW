//Modifiquen las llamadas a las Api chicos para que devuelvan un objeto de este tipo, y no solo el data.
//Esto es para poder manejar los errores de manera mas eficiente,
//Yo voy a respetar esto en el back, por lo que eviten que se rompa la app por un error de este tipo,
//y si lo hace, me avisan para que lo arregle

export interface IPaginatedApiResponse<T>{
    data:T[],
    meta:{
        total:number,
        page:number,
        per_page:number,
        total_pages:number,
    }
}