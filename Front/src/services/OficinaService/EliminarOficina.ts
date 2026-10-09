import {api} from "../api"

export const eliminarOficina = async (id: number) => {
  const res = await api(`/oficinas/${id}`, { method: "DELETE" }).catch(() =>
    api(`/oficina/${id}`, { method: "DELETE" })
  );
  if (!res.ok) {
    const err = new Error("Error al eliminar la oficina");
    throw err;
  }
  return await res.json;
};