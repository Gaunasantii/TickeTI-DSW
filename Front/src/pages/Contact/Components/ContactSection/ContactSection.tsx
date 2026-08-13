import { useState } from "react";

export const ContactSection = () => {
    const [ formData, setFormData ] = useState({
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
        setFormData({ ...formData , [name]: value });
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // Acá va la llamada al service que corresponda
        console.log(formData);
    };

    return (
        <section className="flex flex-col md:flex-row gap-10 px-10 md:px-20 py-16">
            <div className="flex flex-col gap-8 max-w-md">
                <div>
                    <h1 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight">
                        Contacta con nuestro equipo de ventas
                    </h1>

                    <p className="mt-4 text-base text-gray-600 leading-relaxed">
                        Estamos aquí para ayudarte a optimizar tu flujo de trabajo.
                        Coordinaremos los detalles de pago y la programación del
                        servicio de implementación para asegurar una transición
                        perfecta.
                    </p>
                </div>

                <div className="flex items-start gap-4 p-5 rounded-xl border border-gray-200 shadow-sm bg-white">
                    <div className="p-2 rounded-lg bg-indigo-50 text-indigo-600">
                        ✉️
                    </div>
                    <div>
                        <h3 className="font-semibold text-gray-900">Email</h3>
                        <a href="mailto:ventas@ticketti.com" className="text-indigo-600 text-sm hover:underline">
                            ventas@ticketti.com
                        </a>
                    </div>
                </div>
            </div>

            {/* Formulario */}
            <div className="flex-1 p-8 rounded-xl border border-gray-200 shadow-md bg-white">
                <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <div className="flex flex-col gap-1">
                            <label className="text-xs font-semibold text-gray-500 tracking-wide">
                                NOMBRE COMPLETO
                            </label>
                            <input 
                                type="text"
                                name="nombre"
                                placeholder="Ej. Ana Martinez"
                                value={formData.nombre}
                                onChange={handleChange}
                                required
                                className="px-3 py-2 rounded-lg border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-300"
                            />
                        </div>

                        <div className="flex flex-col gap-1">
                            <label className="text-xs font-semibold text-gray-500 tracking-wide">
                                EMAIL CORPORATIVO
                            </label>

                            <input 
                                type="email"
                                name="email"
                                placeholder="ana@empresa.com"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                className="px-3 py-2 rounded-lg border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-300" 
                            />
                        </div>
                    </div>

                    <div className="flex flex-col gap-1">
                        <label className="text-xs font-semibold text-gray-500 tracking-wide">
                            EMPRESA
                        </label>

                        <input 
                            type="text"
                            name="empresa"
                            placeholder="Nombre de la organizacion"
                            value={formData.empresa}
                            onChange={handleChange}
                            className="px-3 py-2 rounded-lg border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-300"
                        />
                    </div>


                    <div className="flex flex-col gap-1">
                        <label className="text-xs font-semibold text-gray-500 tracking-wide">
                            ASUNTO
                        </label>

                        <select 
                            name="asunto"
                            value={formData.asunto}
                            onChange={handleChange}
                            required
                            className="px-3 py-2 rounded-lg border border-gray-300 text-sm text-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-300"
                        >
                            <option value="" disabled>Selecciona el motivo  de contacto</option>
                            <option value="ventas">Consulta de ventas</option>
                            <option value="soporte">Soporte tecnico</option>
                            <option value="otro">Otro</option>
                        </select>
                    </div>

                    <div className="flex flex-col gap-1">
                        <label className="text-xs font-semibold text-gray-500 tracking-wide">
                            MENSAJE
                        </label>

                        <textarea
                            name="mensaje"
                            placeholder="Describe brevemente como podemos ayudarte..."
                            value={formData.mensaje}
                            onChange={handleChange}
                            rows={5}
                            required
                            className="px-3 py-2 rounded-lg border border-gray-300 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-300"
                        />
                    </div>

                    <div className="flex justify-end">
                        <button 
                            type="submit"
                            className="px-6 py-3 bg-indigo-600 text-white text-sm font-medium rounded-lg transition-all duration-300 hover:bg-indigo-700 hover:shadow-md active:scale-95"
                        >
                            Enviar solicitud
                        </button>
                    </div>
                </form>
            </div>
        </section>
    )
}