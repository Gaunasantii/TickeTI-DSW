import {
  Ticket,
  Building2,
  ChartNoAxesCombined,
  BellRing,
} from "lucide-react"

export const listContent = [
  {
    title: "Gestión de Tickets Estructurada",
    description:
      "Clasifique eficientemente mediante Categoría y Prioridad. Filtre listados por estado y asigne al instante.",
    colsSpan: "md:col-span-2",
    icon: Ticket,
  },
  {
    title: "Técnicos y Oficinas",
    description:
      "Gestione la estructura organizativa. Asigne técnicos a oficinas específicas y derive tickets según ubicación.",
    colsSpan: "md:col-span-1",
    icon: Building2,
  },
  {
    title: "Reportes de Resolución",
    description:
      "Visualice tiempos de respuesta, tickets cancelados vs resueltos y carga de trabajo por técnico.",
    colsSpan: "md:col-span-1",
    icon: ChartNoAxesCombined,
  },
  {
    title: "Notificaciones Móviles",
    description:
      "Alertas automáticas los técnicos cuando un ticket asignado se aproxima a su fecha límite.",
    colsSpan: "md:col-span-2",
    icon: BellRing,
  },
]