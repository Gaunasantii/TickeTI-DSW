import { createContext, useContext, useState, useEffect, type ReactNode, Children } from "react";
import { decodeToken, tokenExpirado, type UsuarioToken } from "../utils/decodeToken";

type authContextType = {
    usuario : UsuarioToken | null;
    token : string | null;
    cargando: boolean;
    login: (token: string) => void;
    logout: () => void;
    isAuthenticated: boolean;
}

const authContext = createContext<authContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [usuario, setUsario] = useState<UsuarioToken | null>(null);
    const [token, setToken] = useState<string | null>(null);
    const [cargando, setCargando] = useState(true);

    useEffect( () => {
        const tokenGuardado = localStorage.getItem("token");

        if(!tokenGuardado) {
            setCargando(false);
            return;
        }

        const payload = decodeToken(tokenGuardado);

        if (!payload || tokenExpirado(payload)) {
            localStorage.removeItem('token');
            setUsario(null);
            setToken(null);
        }else{
            setUsario(payload);
            setToken(tokenGuardado);
        }

        setCargando(false);
    }, []);

    const login = (nuevoToken: string) => {
        const payload = decodeToken(nuevoToken);

        if(!payload){
            console.error('No se pudo decodificar el token al hacer login');
            return;
        }

        localStorage.setItem('token', nuevoToken);
        setToken(nuevoToken);
        setUsario(payload);
    };

    const logout = () => {
        localStorage.removeItem('token');
        setToken(null);
        setUsario(null);
    };

    return(
        <authContext.Provider value={{ usuario, token, cargando, login, logout, isAuthenticated: !!usuario, }}>
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