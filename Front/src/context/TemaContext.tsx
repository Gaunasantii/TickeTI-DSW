import {createContext, useContext, useState, useEffect, type ReactNode,} from "react";

type TemaContextType = {
  tema: "claro" | "oscuro";
  toggleTema: () => void;
};

const TemaContext = createContext<TemaContextType | undefined>(undefined);

export const TemaProvider = ({ children }: { children: ReactNode }) => {
  const [tema, setTema] = useState<"claro" | "oscuro">(() => {
    const guardado = localStorage.getItem("tema");
    return guardado === "oscuro" ? "oscuro" : "claro";
  });

  useEffect(() => {
    const root = document.documentElement;

    if (tema === "oscuro") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }

    localStorage.setItem("tema", tema);
  }, [tema]);

  const toggleTema = () => {
    setTema((actual) => (actual === "claro" ? "oscuro" : "claro"));
  };

  return (
    <TemaContext.Provider value={{ tema, toggleTema }}>
      {children}
    </TemaContext.Provider>
  );
};

export const useTema = () => {
  const context = useContext(TemaContext);

  if (!context) {
    throw new Error("useTema debe usarse dentro de un TemaProvider");
  }

  return context;
};
