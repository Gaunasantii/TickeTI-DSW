import { NavBar } from "../../components/Layout/NavBar.tsx";
import { LoginForm } from "./components/LoginForm.tsx";
import { Footer } from "../../components/Layout/Footer.tsx";
import { login as loginService } from "../../services/AuthServices/login.ts";
import { useNavigate } from "react-router";
import { LoginValues } from "../../types/LoginValues.ts";
import { decodeToken } from "../../utils/decodeToken.ts";
import { useAuth } from "../../context/AuthContext.tsx";

export const LoginPage = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const onSubmit = async (formData: LoginValues) => {
    try {
      const resultado = await loginService(formData);
      login(resultado.token);

      const decoded = decodeToken(resultado.token);
      const rol = (decoded?.rol || decoded?.type || decoded?.role || "").toLowerCase();

      // Redirección condicional según el rol
      if (rol === "admin" || rol === "administrador") {
        navigate("/admin");
      } else if (rol === "tecnico") {
        navigate("/tecnico");
      } else {
        navigate("/usuario");
      }
    } catch (error: any) {
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