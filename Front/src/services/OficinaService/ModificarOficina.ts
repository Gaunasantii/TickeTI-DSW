import { api } from "../api.ts"

export const modificarOfina = async (oficinaData: any) => {
  try {
    const response = await api("oficinas/${id}", { method: "PUT", body: JSON.stringify(oficinaData) });
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Error al Crear oficina");
    }

    return data;
  } catch (error) {
    console.error('Error modificar oficina:', error);
    throw error;
  }
}