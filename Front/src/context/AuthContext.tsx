import { createContext, useContext, useState, type ReactNode } from "react";
import { ILoginResponse } from "../responses/ILoginResponse";

type AuthContextType = {
    usuario: ILoginResponse | null;
    login: (usuario: ILoginResponse) => void;
    logout: () => void;
    isAuthenticated: boolean;
    isAdmin: boolean;
    isTecnico: boolean;
    isSuperAdmin: boolean;  
};

const authContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [usuario, setUsuario] = useState<ILoginResponse | null>(() => {
    const usuarioGuardado = sessionStorage.getItem("usuario");
    if (usuarioGuardado) {
      try {
        return JSON.parse(usuarioGuardado);
      } catch {
        return null;
      }
    }
    return null;
    });

    const login = (nuevoUsuario: ILoginResponse) => {
        setUsuario(nuevoUsuario);
        sessionStorage.setItem("usuario", JSON.stringify(nuevoUsuario));
    };

    const logout = () => {
        setUsuario(null);
        sessionStorage.removeItem("usuario");
    };

    const isAdmin = usuario?.type === "admin";
    const isTecnico = usuario?.type === "tecnico";
    const isSuperAdmin = usuario?.dni === "00000000";

    return (
        <authContext.Provider value={{ usuario, login, logout, isAuthenticated: usuario?.dni ? true : false, isAdmin, isTecnico, isSuperAdmin }}>
            {children}
        </authContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(authContext);
    if (!context) {
        throw new Error('useAuth debe usarse dentro de un AuthProvider');
    }
    return context;
};