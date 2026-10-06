import { useState } from "react";
import { cambiarPass } from "../../../services/UsuarioServices/CambiarPassword";

export const CambiarPassForm = () => {
    const [actual , setActual] = useState("");
    const [nueva , setNueva] = useState("");
    const [confirmar , setConfirmar] = useState("");
    const [error , setError] = useState<string | null>(null);
    const [exito , setExito] = useState(false);
    const [cargando , setCargando] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setExito(false);

        if (nueva.length < 6) {
            setError ("La nueva contraseña debe tener al menos 8 caracteres");
            return;
        }

        if (nueva !== confirmar) {
            setError("Las contraseñas no coinciden");
            return;
        }

        setCargando(true);
        try{
            await cambiarPass({passwordActual: actual , passwordNueva: nueva});
            setExito(true);
            setActual("");
            setNueva("");
            setConfirmar("");
        } catch (err: any) {
            setError(err.message || "No se puede cambiar la contraseña");
        } finally {
            setCargando(false);
        }
    };

    return (
        <form  onSubmit={handleSubmit} className="space-y-4" >
            <div >
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-200 mb-1">
                    Contraseña actual.
                </label>
                
                <input type="password" value={actual} onChange={(e) => setActual(e.target.value)} className="w-full px-3 py-2 border border-slate-200 dark:border-slate-600 rounded-lg text-sm bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500" required/>
            </div>

            <div>
                <label className="block text-sm font-medium text-slate-700 mb-1 dark:text-slate-200 mb-1">
                    Nueva contraseña
                </label>

                <input type="passsword" value={nueva} onChange={(e) => setNueva(e.target.value)} className="w-full px-3 py-2 border border-slate-200 dark:border-slate-600 rounded-lg text-sm bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500" required />
            </div>

            <div>
                <label className="block text-sm font-medium text-slate-700 mb-1 dark:text-slate-200 mb-1">
                    Confirmar nueva contraseña
                </label>

                <input type="password" value={confirmar} onChange={(e) => setConfirmar(e.target.value)} className="w-full px-3 py-2 border border-slate-200 dark:border-slate-600 rounded-lg text-sm bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500" required />
            </div>

            {error && <p className="text-sm text-red-600 dark:text-red-400">{error}</p>}
            {exito && <p className="text-sm text-green-600 dark:text-green-400">Contraseña actualizada correctamente</p>}

            <button type="submit" disabled={cargando} className="px-4 py-2 bg-blue-600 dark:bg-blue-500 text-white text-sm font-medium rounded-lg hover:bg-blue-700 dark:hover:bg-blue-600 transition disabled:opacity-50">
                {cargando ? "Guardando..." : "Cambiar contraseña"}
            </button>
        </form>
    );
};
