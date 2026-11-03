import { IApiResponse } from "../responses/IApiResponse";
import { Notify } from "./MessageService/ToastService";
import type { IFieldError } from "../types/IFieldError";

const BASE_URL = import.meta.env.VITE_API_URL;
export const api = async <T>(relativePath: string, options: RequestInit = {}): Promise<T|undefined> => {
  try{const cleanPath = relativePath.startsWith('/') ? relativePath : `/${relativePath}`;
  
  const response: Response = await fetch(`${BASE_URL}${cleanPath}`, {
    ...options,
    credentials: "include",
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  });

  const json: T = await response.json();
  if (!response.ok) {
    switch (response.status) {
      case 400:
        Notify.validationError("Error de validación", { Error: (json as any).errors as IFieldError[] });
        return undefined
        break;
      default:
        Notify.error((json as any).message ?? "Error desconocido");
        return undefined;
        break;
    }
  }

  return json;
}catch(error){
  Notify.error("No se ha podido conectar con el servidor");
}
};