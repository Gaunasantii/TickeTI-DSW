import { ContactForm } from "./ContactForm.tsx";
import { ContactFormValues } from "./ContactFormValues.ts";

export const ContactSection = () => {
    const handleSubmit = (formData:ContactFormValues) => {
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

            <ContactForm onSubmit={handleSubmit}></ContactForm>
        </section>
    )
}