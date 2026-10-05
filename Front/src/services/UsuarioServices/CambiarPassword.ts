import { api } from "../api";

export const cambiarPass = async (datos: {passwordActual: string ; passwordNueva: string}) => {
    const response = await api("/usuarios/cambiar-password" , {method: "PUT", body: JSON.stringify(datos),});
    const resJson = await response.json();

    if (!response.ok) {
        throw new Error(resJson.message || "Error al cambiar la contraseña");
    }
    return resJson;
}