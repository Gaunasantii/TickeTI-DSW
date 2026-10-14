import { NavBar } from "../../components/Layout/NavBar.tsx";
import { LoginForm } from "./components/LoginForm.tsx";
import { Footer } from "../../components/Layout/Footer.tsx";
import { login as loginService } from "../../services/AuthServices/login.ts";
import { useNavigate } from "react-router";
import { LoginValues } from "../../requests/LoginValues.ts";
import { useAuth } from "../../context/AuthContext.tsx";

export const LoginPage = () => {
  const navigate = useNavigate();
  const { login,isAdmin,isSuperAdmin,isTecnico,usuario } = useAuth();

  const onSubmit = async (formData: LoginValues) => {
    try {
      const resultado = await loginService(formData);

      login(resultado.data);

      // Redirección condicional según el rol
      if (isSuperAdmin) {
        navigate("/superadmin");
      } else if (isAdmin) {
        navigate("/admin");
      } else if (isTecnico) {
        navigate("/tecnico");
      } else {
        navigate("/Mis-tickets");
      }
    } catch (error: any) {
      console.error("Error en login:", error);
      alert(error.message || "Error al iniciar sesión");
    }
  };

  return (
    <>
      <LoginForm onSubmit={onSubmit} />
    </>
  );
};

export default LoginPage;