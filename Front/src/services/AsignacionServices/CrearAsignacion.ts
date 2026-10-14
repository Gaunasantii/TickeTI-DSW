import { api } from "../api";

import { ICreateAsignacionRequest } from "../../requests/ICreateAsignacionRequest"; 

export const crearAsignacion = async (data: ICreateAsignacionRequest) => {
  const res = await api("/asignaciones", {
    method: "POST",
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const errorData = JSON.stringify(((await res.json()).errors));
    throw new Error(errorData || "Error al crear la asignación");
  }

  return await res.json();
};