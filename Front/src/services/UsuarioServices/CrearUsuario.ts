import { api } from "../api.ts"

export const crearUsuario = async (usuarioData: any) => {
  try {
    const response = await api("usuarios", { method: "POST", body: JSON.stringify(usuarioData) });
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Error al crear usuario");
    }

    return data;
  } catch (error) {
    console.error('Error creando Usuario:', error);

    throw error;
  }
}