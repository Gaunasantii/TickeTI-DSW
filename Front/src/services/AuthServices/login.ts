import { type LoginValues } from "../../requests/LoginValues";
import { IApiResponse } from "../../responses/IApiResponse.ts";
import { ILoginResponse } from "../../responses/ILoginResponse.ts";
import { Notify } from "../MessageService/ToastService.ts";
import { api } from "../api.ts"

export const login = async (loginData: LoginValues): Promise<IApiResponse<ILoginResponse>> => {
    const data = await api<IApiResponse<ILoginResponse>>("auth/login", { method: "POST", body: JSON.stringify(loginData) });
    Notify.success(data.message!);
    return data;
}