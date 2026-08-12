import React from "react";

const prioridades = [
  { color: "bg-red-500" },
  { color: "bg-blue-500" },
  { color: "bg-gray-400" },
];

export const DashboardExample=()=> {
  return (
    <div className="w-full max-w-xl mx-auto hidden md:block">
      <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl shadow-slate-300/50 p-4 grid grid-cols-[220px_1fr] gap-4">
        <div className="col-span-2 flex items-center gap-2 pb-2">
          <span className="w-3 h-3 rounded-full bg-red-300" />
          <span className="w-3 h-3 rounded-full bg-amber-300" />
          <span className="w-3 h-3 rounded-full bg-emerald-300" />
          <div className="flex-1 h-6 mx-4 rounded-lg bg-blue-100/70" />
        </div>
        <aside className="bg-white rounded-xl border border-slate-100 p-4 flex flex-col gap-3">
          <div className="h-5 rounded-md bg-blue-100" />
          <div className="h-4 rounded-md bg-blue-50 w-5/6" />
          <div className="h-4 rounded-md bg-blue-50 w-4/6" />
          <div className="h-4 rounded-md bg-blue-50 w-5/6" />
        </aside>
 
        {/* Contenido principal */}
        <main className="flex flex-col gap-4">
          {/* Panel de lista de tickets */}
          <section className="bg-white rounded-xl border border-slate-100 p-4">
            <div className="flex items-center justify-between mb-4">
              <div className="h-5 w-40 rounded-md bg-blue-100" />
              <div className="h-6 w-16 rounded-md bg-emerald-200" />
            </div>
 
            <ul className="flex flex-col gap-3">
              {prioridades.map((p, i) => (
                <li key={i} className="flex items-center gap-3">
                  <span className={`w-2 h-2 rounded-full ${p.color} shrink-0`} />
                  <div className="h-4 flex-1 rounded-md bg-blue-100" />
                  <div className="h-4 w-16 rounded-md bg-blue-50" />
                </li>
              ))}
            </ul>
          </section>
 
          {/* Fila inferior: stat + alerta */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white rounded-xl border border-slate-100 p-4 flex flex-col items-center justify-center gap-1">
              <span className="text-3xl font-bold text-slate-800">85%</span>
              <span className="text-sm text-blue-500">Resueltos</span>
            </div>
 
            <div className="bg-red-50 rounded-xl border border-red-100 p-4 flex items-start gap-2">
              <div className="flex-1 flex flex-col gap-2">
                <div className="h-3 rounded-md bg-red-200/70 w-4/5" />
                <div className="h-3 rounded-md bg-red-200/50 w-3/5" />
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}