import { api } from "../api.ts";

export const crearTicket = async (datosTicket: any) => {
  const response = await api("/tickets", {
    method: "POST",
    body: JSON.stringify(datosTicket),
  });

  const resJson = await response.json();

  if (!response.ok) {
    const errorMsg =
      typeof resJson.errors === "object"
        ? JSON.stringify(resJson.errors)
        : resJson.errors || resJson.message || "Error al registrar el ticket";
    throw new Error(errorMsg);
  }

  return resJson.data || resJson;
};

export default crearTicket;