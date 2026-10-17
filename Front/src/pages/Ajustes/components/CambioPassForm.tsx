import { useState } from "react";
import { cambiarPass } from "../../../services/UsuarioServices/CambiarPassword";
import { CheckCircle2 } from "lucide-react";

export const CambiarPassForm = () => {
    const reglas = [
        { id: "long", texto: "Al menos debe contener al menos 8 caraacteres", cumple: (p: string) => p.length >= 8 },
        { id: "mayus", texto: "Al menos debe contener una mayúscula", cumple: (p: string) => /[A-Z]/.test(p) },
        { id: "minus", texto: "Una letra minúscula", cumple: (p: string) => /[a-z]/.test(p) },
        { id: "numero", texto: "Un número", cumple: (p: string) => /\d/.test(p) },
        { id: "simbolo", texto: "Un símbolo (ej: ! @ # $ %)", cumple: (p: string) => /[^A-Za-z0-9]/.test(p) }
    ];
    

    const [actual , setActual] = useState("");
    const [nueva , setNueva] = useState("");
    const [confirmar , setConfirmar] = useState("");
    const [error , setError] = useState<string | null>(null);
    const [exito , setExito] = useState(false);
    const [cargando , setCargando] = useState(false);
    const [mostrarNueva , setMostrarNueva] = useState(false);
    const [mostrarConfirmar , setMostrarConfirmar] = useState(false);
    const reglasEstado = reglas.map((r) => ({ ...r, ok: r.cumple(nueva) }));
    const passValida = reglasEstado.every((r) => r.ok);

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
                
                <input type="text" value={actual} onChange={(e) => setActual(e.target.value)} className="w-full px-3 py-2 border border-slate-200 dark:border-slate-600 rounded-lg text-sm bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500" required/>
            </div>


            <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-200 mb-1">
                    Nueva contraseña
                </label>

                <div className="relative">
                    <input type={mostrarNueva ? "text" : "password"} value={nueva} onChange={(e) => setNueva(e.target.value)} className="w-full px-3 py-2 pr-10 border border-slate-200 dark:border-slate-600 rounded-lg text-sm bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500" required />

                    <button type="button" onClick={() => setMostrarNueva(!mostrarNueva)} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-700 dark:text-slate-300 dark:hover:text-white" aria-label={mostrarNueva ? "Ocultar contraseña" : "Mostrar contraseña"} >
                        {mostrarNueva ? (
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M3 3l18 18" />
                                <path d="M10.6 10.6a2 2 0 0 0 2.8 2.8" />
                                <path d="M9.9 5.2A10.8 10.8 0 0 1 12 5c5 0 9 5 10 7-0.5 1-1.4 2.1-2.7 3.2" />
                                <path d="M6.2 6.2C3.9 7.6 2.5 9.5 2 12c1 2 5 7 10 7 1 0 2-.2 2.9-.6" />
                            </svg>
                        ) : (
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7z" />
                                <circle cx="12" cy="12" r="3" />
                            </svg>
                        )}
                    </button>
                </div>
            </div>

            <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-200 mb-1">
                    Confirmar nueva contraseña
                </label>

                <div className="relative">
                    <input type={mostrarConfirmar ? "text" : "password"} value={confirmar} onChange={(e) => setConfirmar(e.target.value)} className="w-full px-3 py-2 pr-10 border border-slate-200 dark:border-slate-600 rounded-lg text-sm bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500" required />

                    <button type="button" onClick={() => setMostrarConfirmar(!mostrarConfirmar)} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-700 dark:text-slate-300 dark:hover:text-white" aria-label={mostrarConfirmar ? "Ocultar confirmación" : "Mostrar confirmación"} >
                        {mostrarConfirmar ? (
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M3 3l18 18" />
                                <path d="M10.6 10.6a2 2 0 0 0 2.8 2.8" />
                                <path d="M9.9 5.2A10.8 10.8 0 0 1 12 5c5 0 9 5 10 7-0.5 1-1.4 2.1-2.7 3.2" />
                                <path d="M6.2 6.2C3.9 7.6 2.5 9.5 2 12c1 2 5 7 10 7 1 0 2-.2 2.9-.6" />
                            </svg>
                        ) : (
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7z" />
                                <circle cx="12" cy="12" r="3" />
                            </svg>
                        )}
                    </button>
                </div>
            </div>

            {error && <p className="text-sm text-red-600 dark:text-red-400">{error}</p>}
            {exito && <p className="text-sm text-green-600 dark:text-green-400">Contraseña actualizada correctamente</p>}


            <div>
                <ul className="mt-2 space-y-1">
                    {reglasEstado.map((r) => (
                        <li key={r.id} className={`flex items-center gap-2 text-xs transition-colors duration-200 ${ r.ok ? "text-green-600 dark:text-green-400" : "text-slate-400 dark:text-slate-500"}`}>
                            <CheckCircle2 className="w-4 h-4 shrink-0" />
                            {r.texto}
                        </li>
                    ))}
                </ul>
            </div>

            <button type="submit" disabled={cargando || !passValida} className="px-4 py-2 bg-blue-600 dark:bg-blue-500 text-white text-sm font-medium rounded-lg hover:bg-blue-700 dark:hover:bg-blue-600 transition disabled:opacity-50">
                {cargando ? "Guardando..." : "Cambiar contraseña"}
            </button>
        </form>
    );
};
