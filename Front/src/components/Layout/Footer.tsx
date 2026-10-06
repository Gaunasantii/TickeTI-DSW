import { LogoIcon } from "../Logo.tsx"

export const Footer=()=>{
  return(
    <footer className="border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-8 py-6 flex flex-row gap-2">
        <div className="flex items-center gap-2">
          <LogoIcon className="h-6 w-6" />
          <span className="text-sm font-semibold text-gray-900 dark:text-slate-100">TickeTI</span>
        </div>
        <p className="text-sm text-gray-500 dark:text-slate-400">
          © 2026 TickeTI Support Inc. Todos los derechos Reservados.
        </p>
      </div>
    </footer>
  )
}