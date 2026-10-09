import { IModifyOficina } from "../../requests/IModifyOficina.ts";
import { IApiResponse } from "../../responses/IApiResponse.ts";
import { api } from "../api.ts"

export const modificarOficina = async (input:IModifyOficina):Promise<IApiResponse<null>> => {
  try {
    const response = await api(`oficinas/${input.id}`, { method: "PUT", body: JSON.stringify(input) });
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Error al Modificar oficina");
    }

    return data;
  } catch (error) {
    console.error('Error modificar oficina:', error);
    throw error;
  }
}