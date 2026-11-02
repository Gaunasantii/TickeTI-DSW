import { IApiResponse } from "../../responses/IApiResponse";
import { api } from "../api";
import { Notify } from "../MessageService/ToastService";

export const cambiarPass = async (datos: {passwordActual: string ; passwordNueva: string}): Promise<IApiResponse<null>> => {
    const response = await api<IApiResponse<null>>("/persona/cambiar-password" , {method: "PUT", body: JSON.stringify(datos),});
    Notify.success(response.message!);
    return response;
}