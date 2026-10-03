import { jwtDecode } from "jwt-decode";

export interface DecodedToken {
  id?: string | number;
  dni?: string | number;
  rol?: string;
  type?: string;
  email?: string;
  mail?: string;
  name?: string;
  exp?: number;
  [key: string]: any;
}

export const decodeToken = (token: string): DecodedToken | null => {
  try {
    return jwtDecode<DecodedToken>(token);
  } catch (error) {
    console.error("Error decodificando token:", error);
    return null;
  }
};

export const tokenExpirado = (token: string): boolean => {
  try {
    const decoded = jwtDecode<DecodedToken>(token);
    if (!decoded || !decoded.exp) return true;
    return decoded.exp * 1000 < Date.now();
  } catch {
    return true;
  }
};

export default decodeToken;