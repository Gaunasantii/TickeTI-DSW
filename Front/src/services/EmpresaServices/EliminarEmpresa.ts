import { api } from "../api";

export const eliminarEmpresa = async (idOrNombre: string | number): Promise<void> => {
  const res = await api(`/empresas/${idOrNombre}`, {
    method: "DELETE",
  }).catch(() =>
    api(`/empresa/${idOrNombre}`, {
      method: "DELETE",
    })
  );

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.message || "Error al eliminar la empresa");
  }
};