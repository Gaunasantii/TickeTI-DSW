import { NavBar } from "../../components/Layout/NavBar.tsx";
import { LoginForm } from "./components/LoginForm.tsx";
import { Footer } from "../../components/Layout/Footer.tsx";
import { login as loginService } from "../../services/AuthServices/login.ts";
import { useNavigate } from "react-router";
import { LoginValues } from "../../types/LoginValues.ts";
import { useAuth } from "../../context/AuthContext.tsx";

export const LoginPage = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const onSubmit = async (formData: LoginValues) => {
    try {
      const resultado = await loginService(formData);
      const usuario = resultado.data;

      login(usuario);
      alert(resultado.message);

      const rol = (usuario?.type || "").toLowerCase();

      if (rol === "admin" || rol === "administrador") {
        navigate("/admin");
      } else if (rol === "tecnico") {
        navigate("/tecnico");
      } else {
        navigate("/usuario");
      }
    } catch (error: any) {
      console.error("Error en login:", error);
      alert(error.message || "Error al iniciar sesión");
    }
  };

  return (
    <>
      <NavBar />
      <LoginForm onSubmit={onSubmit} />
      <Footer />
    </>
  );
};

export default LoginPage;