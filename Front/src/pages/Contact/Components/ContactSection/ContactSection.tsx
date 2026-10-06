import { ContactForm } from "./ContactForm.tsx";
import { ContactFormValues } from "./ContactFormValues.ts";

export const ContactSection = () => {
    const handleSubmit = (formData: ContactFormValues) => {
        console.log(formData);
    };

    return (
        <section className="flex flex-col md:flex-row gap-10 px-10 md:px-20 py-16 bg-white dark:bg-slate-900 transition-colors duration-300">
            <div className="flex flex-col gap-8 max-w-md">
                <div>
                    <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-slate-100 leading-tight">
                        Contacta con nuestro equipo de ventas
                    </h1>

                    <p className="mt-4 text-base text-gray-600 dark:text-slate-400 leading-relaxed">
                        Estamos aquí para ayudarte a optimizar tu flujo de trabajo.
                        Coordinaremos los detalles de pago y la programación del
                        servicio de implementación para asegurar una transición
                        perfecta.
                    </p>
                </div>

                <div className="flex items-start gap-4 p-5 rounded-xl border border-gray-200 dark:border-slate-700 shadow-sm bg-white dark:bg-slate-800">
                    <div className="p-2 rounded-lg bg-indigo-50 dark:bg-indigo-900/40 text-indigo-600 dark:text-indigo-400">
                        ✉️
                    </div>
                    <div>
                        <h3 className="font-semibold text-gray-900 dark:text-slate-100">Email</h3>
                        <a href="mailto:ventas@ticketti.com" className="text-indigo-600 dark:text-indigo-400 text-sm hover:underline">
                            ventas@ticketti.com
                        </a>
                    </div>
                </div>
            </div>

            <ContactForm onSubmit={handleSubmit}></ContactForm>
        </section>
    )
}