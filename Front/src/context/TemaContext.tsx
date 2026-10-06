import { error } from "node:console";
import { createContext , useContext, useState, useEffect, type ReactNode, Children  } from "react";

type TemaContextType = {
    tema: 'claro' | 'oscuro';
    toggleTema: () => void;
}

const temaContext  = createContext<TemaContextType | undefined>(undefined);

export const TemaProvider = ({ children }: { children: ReactNode}) => {
    const [tema , setTema] = useState<'claro' | 'oscuro'>(() => {
        const guardado = localStorage.getItem('tema');
        return guardado === 'oscuro' ? 'oscuro' : 'claro';
    });

    useEffect(() => {
        const root = document.documentElement;
        if (tema === 'oscuro') {
            root.classList.add('dark');
        } else {
            root.classList.remove('dark');
        }
        localStorage.setItem('dark', tema);
    }, [tema]);

    const toggleTema = () => {
        setTema((actual) => (actual === 'claro' ? 'oscuro' : 'claro'));
    };

    return (
        <temaContext.Provider value={{ tema, toggleTema }}>
            {children}
        </temaContext.Provider>
    );
};

export const useTema = () => {
    const context = useContext(temaContext);
    if (!context) {
        throw new Error ('useTheme debe usarse dentro de un ThemeProvider');
    }

    return context;
}