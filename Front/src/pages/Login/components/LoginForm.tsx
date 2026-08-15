import { useState } from 'react';
import { LoginValues } from './LoginValues.ts';

interface LoginProps{
  onSubmit:(FormData:LoginValues)=>void
}

export const LoginForm = ({onSubmit}:LoginProps) => {
  const [formData, setFormData] = useState({ email: '', pass: '' });
  const [verPass, setVerPass] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); 
    onSubmit(formData)
  };

return (
    <>
      <div className="flex flex-col items-center justify-center min-h-[70vh] px-4">
        <div className="w-full max-w-sm flex flex-col gap-6 p-8 rounded-xl border border-gray-200 shadow-md bg-white">
          <h2 className="text-2xl font-bold text-gray-900 text-center">
            Iniciar Sesión
          </h2>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium text-gray-700">
                E-mail
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="px-3 py-2 rounded-lg border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 transition-all duration-300"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium text-gray-700">
                Contraseña
              </label>
              <input
                type={verPass ? "text" : "password"}
                name="pass"
                value={formData.pass}
                onChange={handleChange}
                required
                className="px-3 py-2 rounded-lg border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 transition-all duration-300"
              />
            </div>

            <button
              type="submit"
              className="
                mt-2
                px-6 py-3
                bg-gray-950
                text-white
                text-sm font-medium
                rounded-lg
                transition-all
                duration-300
                hover:bg-gray-800
                hover:shadow-md
                active:scale-95">
              Iniciar Sesión
            </button>
          </form>
        </div>
      </div>
    </>
  );
};