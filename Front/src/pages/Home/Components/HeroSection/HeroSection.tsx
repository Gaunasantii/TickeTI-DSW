import { DashboardExample } from "./DashBoardExample.tsx"
import { useNavigate } from "react-router"

export const HeroSection=()=>{

  const navigate = useNavigate()

  return(
    <section className=" position:relative min-h-[85vh] min-w-screen flex flex-row justify-around content-center">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top_right,_#e0e7ff_0%,_transparent_60%)]" />
      <div className="flex justify-center flex flex-col flex-grow:1 justify-center content-center p-5 gap-5 max-w-full md:max-w-md">
        <span className="text-4xl font-semibold">
            Soporte al cliente sin complicaciones
        </span>
        <span className="text-slate-600">
          Gestione tickets, coordine tecnicos y analice rendimiento desde una unica plataforma. Diseñado para equipos de soporte que buscan eficiencia y claridad.
        </span>
        <button onClick={()=>navigate("/contact")} className=" self-start px-4 py-2 rounded-lg bg-slate-200 text-slate-800 hover:bg-slate-300 transition-colors block fit-content md:hidden">
          Contactanos
        </button>
      </div>
      <div className="flex flex-grow:1 items-center">
        <DashboardExample></DashboardExample>
      </div>
    </section>
  )
}