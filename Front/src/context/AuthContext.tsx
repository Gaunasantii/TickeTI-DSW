import { createContext, useContext, useState, useEffect, type ReactNode } from "react";

type AuthContextType = {
    token: string | null;
    cargando: boolean;
    login: (token: string) => void;
    logout: () => void;
    isAuthenticated: boolean;
}

const authContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [token, setToken] = useState<string | null>(null);
    const [cargando, setCargando] = useState(true);

    useEffect(() => {
        const tokenGuardado = localStorage.getItem("token");
        setToken(tokenGuardado);
        setCargando(false);
    }, []);

    const login = (nuevoToken: string) => {
        localStorage.setItem('token', nuevoToken);
        setToken(nuevoToken);
    };

    const logout = () => {
        localStorage.removeItem('token');
        setToken(null);
    };

    return (
        <authContext.Provider value={{ token, cargando, login, logout, isAuthenticated: !!token }}>
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
}