import { useState } from "react";
import { loginService } from "../services/api";

export const LoginForm=()=>{
  const [formData, setFormData] = useState({
      email: '',
      pass: '',
    });
  
  const [verPass,setVerPass]= useState(false);

  const changeVisibility=()=>{
    setVerPass(!verPass)
  };

  const handleSubmit=async (e)=>{
    e.preventDefault();
    try{
      const resultado = await loginService.Login(formData);
      setFormData({
        email:'',
        pass: '',
      })

      if(resultado){
        alert("inicio de sesion exitoso")
      }else{
        alert(`fallaste`+resultado)
      };
    } catch(error){
      alert(`error:`+error);
    };
    
  }

  return(
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-xl shadow-md border border-gray-200">
      <h2 className="text-2xl font-bold mb-5 text-gray-800">Iniciar Sesion</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">E-mail</label>
          <input
            type="text"
            className="mt-1 block w-full border border-gray-300 rounded-md p-2 shadow-sm focus:ring-blue-500 focus:border-blue-500"
            value={formData.email}
            onChange={(e)=>setFormData({...formData, email:e.target.value})}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Contraseña</label>
          <input
            type={ verPass ? "password":"text"}
            className="mt-1 block w-full border border-gray-300 rounded-md p-2 shadow-sm focus:ring-blue-500 focus:border-blue-500"
            value={formData.pass}
            onChange={(e)=>setFormData({...formData, pass:e.target.value})}
            required
          />
          <button type="button" onClick={changeVisibility} className="inline-flex items-center justify-center  text-white bg-brand hover:bg-brand-strong focus:ring-4 focus:ring-brand-medium shadow-xs rounded-base w-8 h-8 focus:outline-none">
            sas
          </button>
        </div>

        <div>
          <button 
          type="submit" className="w-full bg-blue-600 text-white font-bold py-2 px-4 rounded-md hover:bg-blue-700 transition duration-300 shadow-sm">
            Iniciar Sesion
          </button>
        </div>
      </form>
      
    </div>
  );
}