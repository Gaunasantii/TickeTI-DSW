import { NavBar } from "../../components/Layout/NavBar.tsx";
import { LoginForm } from "./components/LoginForm.tsx";
import { Footer } from "../../components/Layout/Footer.tsx";
import { login as loginService } from "../../services/AuthServices/login.ts";
import { useNavigate } from "react-router";
import { LoginValues } from "../../requests/LoginValues.ts";
import { useAuth } from "../../context/AuthContext.tsx";

export const LoginPage = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const onSubmit = async (formData: LoginValues) => {
    try {
      const resultado = await loginService(formData);

      // Los datos del usuario vienen en resultado.data
      const usuario = resultado.data || resultado.usuario || resultado;
      const rol = (usuario?.rol || usuario?.role || usuario?.type || "").toLowerCase();

      // Guardamos la sesión en sessionStorage para que muera al cerrar la pestaña
      sessionStorage.setItem("user", JSON.stringify(usuario));

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