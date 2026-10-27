import { CambiarPassForm } from "./CambioPassForm";

export const AjustesSection = () => {

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
            </div>
        </div>
    );
};