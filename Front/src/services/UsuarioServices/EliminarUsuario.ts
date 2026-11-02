import { IApiResponse } from "../../responses/IApiResponse";
import {api} from "../../services/api";
import { Notify } from "../MessageService/ToastService";

export const eliminarUsuario = async (dniUser: string): Promise<IApiResponse<null>> => {
    const res = await api<IApiResponse<null>>(`/usuarios/${dniUser}`, { method: "DELETE" });
    Notify.success(res.message!);
    return res;
};