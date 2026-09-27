import { api } from "../api.ts";

export const obtenerTickets = async () => {
  try {
    const response = await api("/tickets", { method: "GET" });

    // Verificamos si la respuesta del servidor es realmente JSON
    const contentType = response.headers.get("content-type");
    if (!contentType || !contentType.includes("application/json")) {
      console.warn("La respuesta del backend no es JSON (posible 404 o ruta no encontrada):", response.status);
      return [];
    }

    const resJson = await response.json();

    if (!response.ok) {
      throw new Error(resJson.message || "Error al obtener los tickets");
    }

    // Adaptamos según el formato devuelto (ApiSuccessResponse data, array directo, etc.)
    const lista = resJson.data || resJson.tickets || resJson;

    return Array.isArray(lista) ? lista : [];
  } catch (error) {
    console.error("Error obteniendo tickets:", error);
    // Si la base está vacía o hubo fallo de lectura, devolvemos array vacío para evitar el mensaje rojo
    return [];
  }
};

export default obtenerTickets;