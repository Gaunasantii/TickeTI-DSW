import { useState } from "react";
import { ContactFormValues } from "./ContactFormValues.ts";

interface formProps {
  onSubmit: (formData: ContactFormValues) => void,
}

export const ContactForm = ({ onSubmit }: formProps) => {

    const [formData, setFormData] = useState({
        nombre: "",
        email: "",
        empresa: "",
        asunto: "",
        mensaje: "",
    });

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        onSubmit(formData);
    }

    return (
        <div className="flex-1 p-8 rounded-xl border border-gray-200 dark:border-slate-700 shadow-md bg-white dark:bg-slate-800 transition-colors duration-300">
            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="flex flex-col gap-1">
                    <label className="text-xs font-semibold text-gray-500 dark:text-slate-400 tracking-wide">
                    NOMBRE COMPLETO
                    </label>
                    <input
                    type="text"
                    name="nombre"
                    placeholder="Ej. Ana Martinez"
                    value={formData.nombre}
                    onChange={handleChange}
                    required
                    className="px-3 py-2 rounded-lg border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-gray-900 dark:text-slate-100 placeholder-gray-400 dark:placeholder-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-300"
                    />
                </div>

                <div className="flex flex-col gap-1">
                    <label className="text-xs font-semibold text-gray-500 dark:text-slate-400 tracking-wide">
                    EMAIL CORPORATIVO
                    </label>

                    <input
                    type="email"
                    name="email"
                    placeholder="ana@empresa.com"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="px-3 py-2 rounded-lg border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-gray-900 dark:text-slate-100 placeholder-gray-400 dark:placeholder-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-300"
                    />
                </div>
                </div>

                <div className="flex flex-col gap-1">
                <label className="text-xs font-semibold text-gray-500 dark:text-slate-400 tracking-wide">
                    EMPRESA
                </label>

                <input
                    type="text"
                    name="empresa"
                    placeholder="Nombre de la organizacion"
                    value={formData.empresa}
                    onChange={handleChange}
                    className="px-3 py-2 rounded-lg border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-gray-900 dark:text-slate-100 placeholder-gray-400 dark:placeholder-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-300"
                />
                </div>

                <div className="flex flex-col gap-1">
                <label className="text-xs font-semibold text-gray-500 dark:text-slate-400 tracking-wide">
                    ASUNTO
                </label>

                <select
                    name="asunto"
                    value={formData.asunto}
                    onChange={handleChange}
                    required
                    className="px-3 py-2 rounded-lg border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-sm text-gray-600 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-300"
                >
                    <option value="" disabled>Selecciona el motivo  de contacto</option>
                    <option value="ventas">Consulta de ventas</option>
                    <option value="soporte">Soporte tecnico</option>
                    <option value="otro">Otro</option>
                </select>
                </div>

                <div className="flex flex-col gap-1">
                <label className="text-xs font-semibold text-gray-500 dark:text-slate-400 tracking-wide">
                    MENSAJE
                </label>

                <textarea
                    name="mensaje"
                    placeholder="Describe brevemente como podemos ayudarte..."
                    value={formData.mensaje}
                    onChange={handleChange}
                    rows={5}
                    required
                    className="px-3 py-2 rounded-lg border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-gray-900 dark:text-slate-100 placeholder-gray-400 dark:placeholder-slate-500 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-300"
                />
                </div>

                <div className="flex justify-end">
                <button
                    type="submit"
                    className="px-6 py-3 bg-indigo-600 dark:bg-indigo-500 text-white text-sm font-medium rounded-lg transition-all duration-300 hover:bg-indigo-700 dark:hover:bg-indigo-600 hover:shadow-md active:scale-95"
                >
                    Enviar solicitud
                </button>
                </div>
            </form>
        </div>
    )
}