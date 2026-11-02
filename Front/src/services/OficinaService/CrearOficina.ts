import { ICreateOficinaRequest } from "../../requests/ICreateOficinaRequest.ts";
import { api } from "../api.ts"
import { IApiResponse } from "../../responses/IApiResponse.ts";
import { Notify } from "../MessageService/ToastService.ts";

export const crearOficina = async (oficinaData: ICreateOficinaRequest): Promise<IApiResponse<null>> => {
    const response = await api<IApiResponse<null>>("oficinas", { method: "POST", body: JSON.stringify(oficinaData) });
    Notify.success(response.message!);

    return response;
}