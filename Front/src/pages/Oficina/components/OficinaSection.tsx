import { useEffect, useState } from "react";
import { Oficina } from "../../../types/Oficina";
import { ListarOficinas } from "../../../services/OficinaService/ListarOficina";
import { crearOficina } from "../../../services/OficinaService/CrearOficina";


export const OficinaSection= () => {
    const [oficinas , setOficinas] = useState<Oficina[]>([])
    const [busqueda, setBusqueda] = useState("");


    //Alta
    const [mostrarModal, setMostrarModal] = useState(false);

    const [oficinaData,setData]=useState({
        nombre:"",
        empresa:0
    })

    const [guardando, setGuardando] = useState(false);

    const cargaOficina = () => {
        ListarOficinas().then((res) => setOficinas(res.data ?? res));
    };

    useEffect(() => {
        ListarOficinas().then((res)=>setOficinas(res.data));
    }, []);

    const oficinasFiltradas = oficinas.filter((o) =>
        o.nombre.toLowerCase().includes(busqueda.toLowerCase())
    );

    const handleCrearOficina = async (e: React.FormEvent) => {
        e.preventDefault();
        setGuardando(true);
        try{
            await crearOficina(oficinaData);
            setMostrarModal(false);
            setData({
                nombre:"",
                empresa:0
            })
            cargaOficina();
        } catch (error){
            alert("No se pudo crear la oficina")
        } finally {
            setGuardando(false);
        }

    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>, isNumeric:boolean=false) => {
    const { name, value } = e.target;
    if(isNumeric) {setData({ ...oficinaData, [name]: Number(value) })}
    else{setData({ ...oficinaData, [name]: value })};
  };

    return (
        <div className="px-10 md:px-20 py-16">
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6 mb-10">
                <div className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight">
                    <h1 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight">
                        Gestion de oficinas
                    </h1>

                    <p className="mt-4 text-base text-gray-600 leading-relaxed max-w-2xl">
                        Admistra las ubicaciones fisicas, asigna tecnicos y monitorea el estado de las diferentes sucursales.
                    </p>
                </div>
                <button onClick={() => setMostrarModal(true)} className="shrink-0 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-5 py-3 rounded-lg transition-colors">
                    + Nueva oficina
                </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-10">
                <div className="flex flex-col gap-2 p-5 rounded-xl border border-gray-200 shadow-sm bg-white">
                    <span className="text-xs font-semibold tracking-wide text-gray-500">
                        TOTAL OFICINAS
                    </span>
                    <span className="text-2xl font-bold text-gray-900">
                        {oficinas.length}
                    </span>
                </div>

            </div>

            <div className="rounded-xl border border-gray-200 shadow-sm bg-white overflow-hidden">
                <div className="flex items-center justify-end p-4 border-b border-gray-100">

                    <input 
                        className="w-full sm:w-72 px-4 py-2 rounded-lg border border-gray-300 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                        placeholder="Filtrar tabla..."
                        value={busqueda}
                        onChange={(e) => setBusqueda(e.target.value)}
                    />
                </div>

                <table className="w-full text-left">
                    <thead>
                        <tr className="border-b border-gray-100">
                            <th className="px-4 py-3 text-xs font-semibold tracking-wide text-gray-500">
                                OFICINA
                            </th>

                            <th className="px-4 py-3 text-xs font-semibold tracking-wide text-gray-500">
                                ACCIONES
                            </th>
                        </tr>
                    </thead>

                    <tbody>
                        
                        {oficinasFiltradas.map((of) => (
                            <tr key={of.id} className="border-b border-gray-50 last:border-0 hover:bg-gray-50">
                                <td className="px-4 py-4">
                                    <strong className="text-gray-900 font-semibold">
                                        {of.nombre}
                                    </strong>

                                    <div className="text-xs text-gray-400 mt-0.5">
                                        ID: OFI-{of.id}
                                    </div>
                                </td>

                                <td>{/* acciones: editar / eliminar */}</td>
                            </tr>
                        ))}
                        
                    </tbody>
                </table>
            </div>

            {mostrarModal && (
                <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
                    <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-md">
                        <h2 className="text-xl font-bold text-gray-900 mb-4">
                            Nueva oficina
                        </h2>

                        <form onSubmit={handleCrearOficina} className="flex flex-col gap-4">
                            <input name="nombre" className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500" placeholder="Nombre de la oficina" value={oficinaData.nombre} onChange={(e) => handleChange(e)} required />
                            {/*El segundo input tiene que removerse */}
                            <input name="empresa" className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500" placeholder="ID de la empresa" type="number" value={oficinaData.empresa} onChange={(e) => {handleChange(e,true)}} required />
                            <div className="flex justify-end gap-3 mt-2">
                                <button type="button" onClick={() => setMostrarModal(false)} className="px-4 py-2 rounded-lg text-gray-600 hover:bg-gray-100">
                                    Cancelar
                                </button>

                                <button type="submit" className="px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-semibold disabled:opacity-50">
                                    {guardando ? "Guardando..." : "Guardar"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};