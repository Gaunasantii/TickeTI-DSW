import { NavBar } from "../../components/Layout/NavBar.tsx"
import { LoginForm } from "./components/LoginForm.tsx"
import { Footer } from "../../components/Layout/Footer.tsx"
import { login as loginService } from "../../services/AuthServices/login.ts"
import { useNavigate } from 'react-router'
import { LoginValues } from "../../types/LoginValues.ts"
import { useAuth } from "../../context/AuthContext.tsx"

export const LoginPage = () => {

  const navigate = useNavigate();
  const { login } = useAuth();

  const onSubmit = async (formData: LoginValues) => {
    try {
      const resultado = await loginService(formData);
      login(resultado.data);
      alert(resultado.message);
      navigate('/dashboard');
    } catch (error: any) {
      alert(error.message || "Error al iniciar sesión");
    }
  }

  return (
    <>
      <NavBar></NavBar>
      <LoginForm onSubmit={onSubmit}></LoginForm>
      <Footer></Footer>
    </>
  )
}