import { IModifyPersonRequest } from '../../requests/IModifyPersonRequest';
import {api} from '../api';

export const modificarTecnico = async (dni: string, data:IModifyPersonRequest) => {
  const response = await api(`/tecnicos/${dni}`, {
    method: "PUT",
    body: JSON.stringify(data),
  });
  return response;
};