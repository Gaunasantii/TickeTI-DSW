import { api } from "../api";
import type { ICreateTicketRequest } from "../../requests/ICreateTicketRequest";
import {Notify} from "../MessageService/ToastService";
import type { IApiResponse } from "../../responses/IApiResponse";

export const crearTicket = async (data: ICreateTicketRequest): Promise<IApiResponse<null>|undefined> => {
  const payload = {
    title: data.title.trim(),
    description: data.description.trim(),
    prioridad: Number(data.prioridad),
    categoria: Number(data.categoria),
  };

  const res = await api<IApiResponse<null>>("/tickets", {
    method: "POST",
    body: JSON.stringify(payload),
  });

  if(res)Notify.success(res.message!);
  
  return res;
};