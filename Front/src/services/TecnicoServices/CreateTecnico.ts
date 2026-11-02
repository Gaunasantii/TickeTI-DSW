import { ICreatePersonRequest } from "../../requests/ICreatePersonRequest";
import { IApiResponse } from "../../responses/IApiResponse";
import {api} from "../api";
import { Notify } from "../MessageService/ToastService";

export const CreateTecnico=async(data:ICreatePersonRequest):Promise<IApiResponse<null>>=>{
    const response = await api<IApiResponse<null>>("/tecnicos", {method: "POST", body: JSON.stringify(data)});
    Notify.success(response.message!);
    return response;
}