import React from "react";
import { asignacionModel } from "../../../models/asignacion.model";
import { CategoriaModel } from "../../../models/categoria.model";
import { estadoModel } from "../../../models/estado.model";

interface AsignacionCardProps {
    asignacion:asignacionModel;
    categorias: CategoriaModel[];
    estados: estadoModel[];
    onChangeEstadoTicket?: (asignacionId: number|string, nuevoEstado: string) => Promise<void>;
    onEliminar?: (asignacionId: number|string) => Promise<void>;
    onResolver?: (asignacionId: number|string,solucion: string) => Promise<void>;
    onCambiarCategoria: (asignacionId: number|string, nuevaCategoria: string) => Promise<void>;
}


const AsignacionCard:React.FC<AsignacionCardProps>=({asignacion,categorias,estados,onChangeEstadoTicket,onEliminar,onResolver,onCambiarCategoria })=>{
    const categoriaNombre = asignacion.ticket.categoria instanceof Object ? asignacion.ticket.categoria.nombre : asignacion.ticket.categoria;
    const estadoNombre = asignacion.ticket.estado instanceof Object ? asignacion.ticket.estado.nombre : asignacion.ticket.estado;
    const prioridadNombre = asignacion.ticket.prioridad instanceof Object ? asignacion.ticket.prioridad.nombre : asignacion.ticket.prioridad;
    const [isDesplegableActivo, setDesplegableActivo] = React.useState<boolean>(false);
    const [tipoDesplegable, setTipoDesplegable] = React.useState<'categoria' | 'estado' | 'resolver' | null>(null);
    const [cargando, setCargando] = React.useState<boolean>(false);
    const [valor, setValor] = React.useState<string>("");

    const handleEnviar = (valor: string, tipo: 'categoria' | 'estado' | 'resolver' | null) => {
        switch (tipo) {
          case 'categoria':
            onCambiarCategoria?.(asignacion.ticket.id, valor);
            break;
          case 'resolver':
            onResolver?.(asignacion.ticket.id, valor);
            break;
          case 'estado':
            onChangeEstadoTicket?.(asignacion.ticket.id, valor);
            break;
        }
        setDesplegableActivo(false);
      };

    const handleTipoInput = (tipo: 'categoria' | 'estado' | 'resolver') => {
        setTipoDesplegable(tipo);
        setDesplegableActivo(true);
    };

    const handleOpciones=()=>{
        switch (tipoDesplegable) {
          case 'categoria':
            return categorias;
          case 'estado':
            return estados;
          default:
            return [];
        }
    }
    return (
    <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm hover:border-slate-300 transition flex flex-col md:flex-row md:items-center justify-between gap-4">
      <div className="space-y-1.5 flex-1">
        <div className="flex items-center gap-2.5">
          <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-700">
            
          </span>
          <h3 className="font-semibold text-slate-800 text-sm">{asignacion.ticket.title}</h3>

          {asignacion.ticket.categoria && (
            <span className="text-[11px] font-medium px-2 py-0.5 rounded-md bg-indigo-50 text-indigo-700 border border-indigo-100">
              {categoriaNombre}
            </span>
          )}
        </div>

        <p className="text-xs text-slate-500 line-clamp-2">{asignacion.ticket.description}</p>

        <div className="flex flex-wrap items-center gap-2 pt-1 text-xs">
          <span className={`px-2 py-0.5 rounded-full font-medium border ${estadoNombre}`}>
            {estadoNombre}  
          </span>
          <span className={`px-2 py-0.5 rounded-full font-medium border ${prioridadNombre}`}>
            {prioridadNombre}
          </span>
          <span className="text-slate-400">|</span>
          <span className="text-slate-600">
            Solicitante: <strong className="font-mono text-slate-800">{asignacion.ticket.usuario}</strong>
          </span>
              <span className="text-slate-400">|</span>
              <span className="text-slate-500">
                Creado: <strong className="font-normal text-slate-700">{asignacion.fechaCreacion}</strong>
              </span>
        </div>
        <div className="flex gap-2 mt-2">
          <button type="button" 
            onClick={() => onEliminar?.(asignacion.id)}
            className="px-3 py-1.5 text-xs font-semibold text-red-700 bg-red-50 hover:bg-red-100 border border-red-200/80 rounded-xl transition shadow-xs"
          >
            Abandonar
          </button>
          <button type="button" 
            onClick={() => {handleTipoInput('resolver');}}
            className="px-3 py-1.5 text-xs font-semibold text-green-700 bg-green-50 hover:bg-green-100 border border-green-200/80 rounded-xl transition shadow-xs"
          >
            Resolver
          </button>
          
          <button 
            type="button"
            onClick={() => {handleTipoInput('categoria');}}
            className="px-3 py-1.5 text-xs font-semibold text-teal-700 bg-teal-50 hover:bg-teal-100 border border-teal-200/80 rounded-xl transition shadow-xs"
          >
            Cambiar categoría
          </button>
          

        </div>
        {isDesplegableActivo && (
          <div className="mt-2 p-3 bg-slate-50 border border-slate-200 rounded-xl flex justify-between items-center gap-3 animate-in fade-in slide-in-from-top-1 duration-150">
            <div className="flex flex-col gap-2 w-full">
            <span className="text-xs font-semibold text-slate-600 capitalize">
              Ingrese nuevo valor:
            </span>

            {tipoDesplegable==="resolver" && (
            <textarea
              value={valor}
              onChange={(e) => setValor(e.target.value)}
              disabled={cargando}
              className="text-xs px-3 py-1.5 bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-700 disabled:opacity-50"
            />
            )}

            {(tipoDesplegable === "categoria" || tipoDesplegable === "estado")  && (
              <select
              disabled={cargando}
              defaultValue=""
              onChange={(e) => setValor(e.target.value)}
              className="text-xs px-3 py-1.5 bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-700 disabled:opacity-50 cursor-pointer"
            >
              <option value="" disabled>
                -- Seleccionar opción --
              </option>
              {handleOpciones().map((item) => (
                <option key={item.id} value={item.id}>
                  {item.nombre}
                </option>
              ))}
            </select>
            )}
            </div>

            {cargando && (
              <span className="text-xs text-blue-600 font-medium animate-pulse">
                Guardando cambios...
              </span>
            )}
            <div className="flex gap-2 mt-2">
            <button
              type="button"
              onClick={() => {
                handleEnviar(valor, tipoDesplegable)
                setDesplegableActivo(false)
                setValor('');
              }}
              disabled={cargando}
              className="ml-auto text-xs text-white bg-blue-600 hover:bg-blue-700 font-bold px-3 py-1.5 rounded transition disabled:opacity-50"
            >
              Guardar
            </button>
            <button
              type="button"
              onClick={() => setDesplegableActivo(false)}
              className="ml-auto text-xs text-slate-400 hover:text-slate-600 font-bold px-2 py-0.5 rounded hover:bg-slate-200 transition"
              title="Cerrar"
            >
              ✕
            </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default AsignacionCard;