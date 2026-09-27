import { api } from "../api.ts";

export const crearTicket = async (datosTicket: any) => {
  const response = await api("/tickets", {
    method: "POST",
    body: JSON.stringify(datosTicket),
  });

  const resJson = await response.json();

  if (!response.ok) {
    throw new Error(resJson.message || "Error al registrar el ticket");
  }

  return resJson.data || resJson;
};

export default crearTicket;