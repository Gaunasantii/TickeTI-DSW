import { useNavigate } from "react-router";
import { LogoIcon } from "../Logo.tsx";

export const NavBar = () => {
  const navigate = useNavigate();

  return (
    <nav className="flex sticky top-0 w-full flex-row p-5 bg-white shadow-md justify-between items-center z-50">
      <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate("/")}>
        <LogoIcon />
        <span className="text-lg font-semibold text-gray-800">TicketTI Support</span>
      </div>

      <div className="flex flex-row justify-end items-center gap-6">
        <button
          onClick={() => navigate("/contact")}
          className="btn btn-secondary transition-all duration-300 hover:shadow-md active:scale-95 hidden md:block"
        >
          Contactanos
        </button>

        <button
          onClick={() => navigate("/login")}
          className="btn btn-primary transition-all duration-300 hover:shadow-md active:scale-95"
        >
          Ingresar
        </button>
      </div>
    </nav>
  );
};

export default NavBar;