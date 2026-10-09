import {api} from "../../services/api";

export const eliminarUsuario = async (dniUser: string) => {
  try {
    const res = await api(`/usuarios/${dniUser}`, { method: "DELETE" });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.message || "Error al eliminar usuario");
    }
  } catch (err) {
    console.error("Error al eliminar usuario:", err);
    throw err;
  }
};