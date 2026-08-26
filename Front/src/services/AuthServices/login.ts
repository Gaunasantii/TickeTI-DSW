import { LoginValues } from "../../types/LoginValues.ts"
import { api } from "../api.ts"

export const login = async (loginData: LoginValues) => {
  try {
    const response = await api("auth/login", { method: "POST", body: JSON.stringify(loginData) });
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Error al iniciar sesión");
    }

    return data;
  } catch (error) {
    console.error("Error al iniciar sesion:", error)

    throw error
  }
}