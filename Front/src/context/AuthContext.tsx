import { createContext, useContext, useState, type ReactNode } from "react";

type Usuario = {
    dni: string;
    rol: string;
    name: string;
};

type AuthContextType = {
    usuario: Usuario | null;
    login: (usuario: Usuario) => void;
    logout: () => void;
    isAuthenticated: boolean;
};

const authContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [usuario, setUsuario] = useState<Usuario | null>(null);

    const login = (nuevoUsuario: Usuario) => {
        setUsuario(nuevoUsuario);
    };

    const logout = () => {
        setUsuario(null);
    };

    return (
        <authContext.Provider value={{ usuario, login, logout, isAuthenticated: !!usuario }}>
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