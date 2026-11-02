import { IModifyOficina } from "../../requests/IModifyOficina.ts";
import { IApiResponse } from "../../responses/IApiResponse.ts";
import { api } from "../api.ts"
import { Notify } from "../MessageService/ToastService.ts";

export const modificarOficina = async (input:IModifyOficina):Promise<IApiResponse<null>> => {
    const response = await api<IApiResponse<null>>(`oficinas/${input.id}`, { method: "PUT", body: JSON.stringify(input) });
    Notify.success(response.message!);
    return response;
}