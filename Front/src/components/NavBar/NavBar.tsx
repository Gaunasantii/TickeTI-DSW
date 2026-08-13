import { Navigate, useNavigate } from 'react-router';
import { LogoIcon } from "../Logo.tsx"

export const NavBar=()=>{
  const navigate = useNavigate();

  return(
    <nav className="flex sticky top-0 w-full flex-row p-5 bg-white shadow-md justify-between">
      <div className="flex flex-row justify-between">
        <div className="flex items-center gap-2">
          <a href="/">
            <LogoIcon/>
          </a>
          <a href="/">
            <span className="text-lg font-semibold">TicketTI Support</span>
          </a>
        </div>
      </div>

      <div className="flex flex-row justify-end gap-10 ">
        <button className="
          onClick={() => navigate('/contact')}
          btn btn-secondary
          transition-all
          duration-300
          hover:shadow-md
          active:scale-95
          hidden
          md:block">Contactanos</button>
        <button 
          onClick={() => navigate('/login')}
          className="btn
          btn-primary 
          transition-all
          duration-300
          hover:shadow-md
          active:scale-95">Ingresar</button>
      </div>
    </nav>
  )
}