import { NavBar } from "../../components/Layout/NavBar.tsx"
import { LoginForm } from "./components/LoginForm.tsx"
import { Footer } from "../../components/Layout/Footer.tsx"
import { login } from "../../services/AuthServices/login.ts"
import { Navigate, useNavigate } from 'react-router'
import { LoginValues } from "../../types/LoginValues.ts"
export const LoginPage=()=>{

  const navigate=useNavigate();
  
  const onSubmit=async (formData:LoginValues)=>{
    try {
      const resultado = await login(formData);
      alert(resultado.message);
      //localStorage.setItem('usuarioTickeTI', JSON.stringify(resultado.data));
      //navigate('/dashboard');
    } catch (error: any) {
      alert(error.message || "Error al iniciar sesión");
    }
  }

  return(
    <>
    <NavBar></NavBar>
    <LoginForm onSubmit={onSubmit}></LoginForm>
    <Footer></Footer>
    </>
  )
}