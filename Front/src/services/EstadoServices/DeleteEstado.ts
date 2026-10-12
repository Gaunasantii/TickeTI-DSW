import { IApiResponse } from "../../responses/IApiResponse";
import {api} from "../api";

export const deleteEstado = async (estadoId: number):Promise<IApiResponse<null>> => {
    const response = await api(`/estados/${estadoId}`, {method: "DELETE"});

    if(!response.ok) {
        throw new Error("Error eliminando el estado:" + (await response.json()).errors);
    }

    return await response.json();
};