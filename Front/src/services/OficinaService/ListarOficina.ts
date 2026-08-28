import { api } from "../api.ts"

export const ListarOficinas = async () => {
  try {
    const response = await api("oficinas", { method: "GET" });
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Error al Crear oficina");
    }

    return data;
  } catch (error) {
    console.error('Error mostrar oficina:', error);
    throw error;
  }
}