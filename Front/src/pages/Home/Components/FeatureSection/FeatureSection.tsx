import { CardComponent } from "./CardComponent.tsx"
import { listContent } from "./staticData.ts"

export const FeatureSection=()=>{
  return(
    <section className="flex flex-col min-h-[85vh] min-w-screen bg-[radial-gradient(ellipse_at_center,_#e0e7ff_0%,_transparent_60%)] border-t border-gray-100 py-20 p-5">
      <div className="flex justify-center flex flex-col flex-grow:1 justify-center content-center p-5 gap-5 max-w-full">
        <span className="text-2xl font-semibold content-center text-center">
            Todo lo necesario para Resolver sus problemas rapidamente
        </span>
        <span className="text-base text-slate-600 text-center w-full md:w-md">
          Nuestra arquitectura basada en CRUDs asegura que la informacion fluya sin friccion desde el usuario al tecnico.
        </span>
      </div>
      <div className="grid grid-cols-1 gap-4 h-full flex-1 md:grid-cols-3">
        {listContent.map((li) => (
          <CardComponent
            key={li.title}
            title={li.title}
            description={li.description}
            colspan={li.colsSpan}
            Icon={li.icon}
          />
        ))}
      </div>
    </section>
  )
}