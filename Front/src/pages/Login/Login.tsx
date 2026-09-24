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
      console.log("Respuesta completa del login:", resultado);

      // Los datos del usuario vienen directamente en resultado.data
      const usuario = resultado.data || resultado.usuario || resultado;
      const rol = (usuario?.rol || usuario?.role || usuario?.type || "").toLowerCase();

      // Guardamos la sesión del usuario en localStorage
      localStorage.setItem("usuario", JSON.stringify(usuario));

      // Si el contexto tiene función de login, le pasamos los datos
      if (login) {
        login(usuario);
      }

      // Redirección condicional según el rol
      if (rol === "admin" || rol === "administrador") {
        navigate("/admin");
      } else if (rol === "tecnico") {
        navigate("/tecnico");
      } else {
        navigate("/usuario");
      }
    } catch (error: any) {
      console.error(error);
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