import { NavBar } from "../../components/Layout/NavBar.tsx"
import { LoginForm } from "./components/LoginForm.tsx"
import { Footer } from "../../components/Layout/Footer.tsx"
import { login as loginService} from "../../services/AuthServices/login.ts"
import { Navigate, useNavigate } from 'react-router'
import { LoginValues } from "../../types/LoginValues.ts"
import { decodeToken } from "../../utils/decodeToken.ts"
import { useAuth } from "../../context/AuthContext.tsx"

export const LoginPage=()=>{

  const navigate=useNavigate();
  const { login } = useAuth();
  
  const onSubmit=async (formData:LoginValues)=>{
    try {
      const resultado = await loginService(formData);
      login (resultado.token);
      navigate('/dashboard');
      alert(resultado.message);
      console.log(decodeToken(resultado.token));
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