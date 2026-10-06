import { api } from "../api.ts"

export const crearOficina = async (oficinaData: any) => {
  try {
    const response = await api("oficinas", { method: "POST", body: JSON.stringify(oficinaData) });
    const data = await response.json();

    console.log(data)

    if (!response.ok) {
      throw new Error(data.message || "Error al Crear oficina");
    }

    return data;
  } catch (error) {
    console.error('Error creando oficina:', error);
    throw error;
  }
}