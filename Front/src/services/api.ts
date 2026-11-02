import { IApiResponse } from "../responses/IApiResponse";
import { Notify } from "./MessageService/ToastService";
import type { IFieldError } from "../types/IFieldError";
const BASE_URL = 'http://localhost:3000/api';

export const api = async <T>(relativePath: string, options: RequestInit = {}): Promise<T> => {
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
        break;
      default:
        Notify.error((json as any).message ?? "Error desconocido");
        break;
    }
    return Promise.reject(json);
  }

  return json;
}catch(error){
  Notify.error("No se ha podido conectar con el servidor");
  throw error;
}
};