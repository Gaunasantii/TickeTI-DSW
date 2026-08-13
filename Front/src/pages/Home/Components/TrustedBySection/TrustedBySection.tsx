import { companyData } from "./staticCompanyData.ts"

export const TrustedBySection=()=>{
  return(
    <section className="h-[20vh] flex flex-col gap-5 border-t border-gray-100 p-5 shadow-md hidden md:block">
      <div className="w-full text-center">
        <span className="font-medium text-base">Equipos de soporte que confian en nostros</span>        
      </div>
      <div className="flex flex-1 h-full gap-5 justify-around items-center">
        {companyData.map((li)=>
          <div className="font-semibold text-lg text-slate-600/50" key={li.id}>
            {li.name}
          </div>
        )}
      </div>
    </section>
  )
}