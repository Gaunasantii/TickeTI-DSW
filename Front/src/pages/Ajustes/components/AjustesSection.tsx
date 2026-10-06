import { ToggleLeft } from "lucide-react";
import { CambiarPassForm } from "./CambioPassForm";
import { useTema } from "../../../context/TemaContext";

export const AjustesSection = () => {

    const { tema, toggleTema } = useTema();

    return (
        <div  className="bg-white dark:bg-slate-800 border border-slate-200 rounded-xl p-6 shadow-sm mt-4">
            <div className="p-8 max-w-2xl mx-auto">
                <h1 className="text-2xl font-bold text-slate-800 mb-1 dark:text-slate-100 mb-1">
                    Ajustes
                </h1>

                <p className="text-sm text-slate-500 mb-6 dark:text-slate-400 mb-6">
                    Administra tu cuenta y preferencias.
                </p>

                <div className="bg-white dark:bg-slate-800 border border-slate-200 rounded-xl p-6 shadow-sm mt-4">
                    <h2 className="text-sm font-semibold text-slate-700 mb-3 dark:text-slate-200 mb-3">
                        Cambiar contraseña
                    </h2>
                    <CambiarPassForm />
                </div>

                <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-6 shadow-sm mt-4">
                    <h2 className="text-sm font-semibold text-slate-700 dark:text-slate-200 mb-3">
                        Apariencia
                    </h2>

                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-slate-700 dark:text-slate-200 font-medium">
                                Modo oscuro
                            </p>

                            <p className="text-xs text-slate-500 dark:text-slate-400">
                                Cambia la apariencia de toda la aplicación.
                            </p>
                        </div>

                        <button onClick={toggleTema} className={`relative w-12 h-6 rounded-full transition-colors ${ tema === 'oscuro' ? 'bg-indigo-600' : 'bg-slate-300'}`}>
                            <span className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform ${ tema === 'oscuro' ? 'translate-x-6' : 'translate-x-0'}`}/>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};