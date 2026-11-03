import { IModifyPersonRequest } from '../../requests/IModifyPersonRequest';
import {api} from '../api';
import type { IApiResponse } from '../../responses/IApiResponse';
import { Notify } from '../MessageService/ToastService';

export const modificarTecnico = async (dni: string, data:IModifyPersonRequest): Promise<IApiResponse<null>|undefined> => {
  const response = await api<IApiResponse<null>>(`/tecnicos/${dni}`, {
    method: "PUT",
    body: JSON.stringify(data),
  });

  if(response)Notify.success(response.message!);
  return response;
};