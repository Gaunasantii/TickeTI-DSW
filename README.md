# 🎫 TickeTI — Sistema de Gestión de Tickets e Incidencias

Aplicación web para la gestión centralizada de soporte técnico, solicitudes e incidencias en entornos multi-empresa, desarrollada para la materia Desarrollo de Software (UTN FRRo).

TickeTI conecta a usuarios solicitantes, técnicos de soporte, administradores de empresa y superadministradores globales. Permite reportar problemas técnicos, dar seguimiento en tiempo real, asignar tareas a personal especializado y parametrizar catálogos del sistema.

---
## 📑 Índice

- [Tecnologías](#-tecnologías)
- [Funcionalidades por rol](#-funcionalidades-por-rol)
- [Arquitectura del sistema](#-arquitectura-del-sistema)
- [Modelo de dominio](#-modelo-de-dominio)
- [Decisiones de diseño](#-decisiones-de-diseño)
- [Requisitos previos](#-requisitos-previos)
- [Instalación](#-instalación)
- [Ejecución](#-ejecución)
- [Datos iniciales (Seeders)](#-datos-iniciales-seeders)
- [Autenticación y rutas protegidas](#-autenticación-y-rutas-protegidas)
- [Mapa de rutas y Endpoints](#-mapa-de-rutas-y-endpoints)
- [Estructura del proyecto](#-estructura-del-proyecto)
- [Manejo de errores](#-manejo-de-errores)

---
## 🛠 Tecnologías

### Backend (`/Back`)

| Categoría          | Herramienta                                       |
| ------------------ | ------------------------------------------------- |
| Runtime            | Node.js                                           |
| Lenguaje           | TypeScript                                        |
| Framework web      | Express                                           |
| Base de datos      | MySQL / ORM                                       |
| Validación         | DTOs + Middleware de validación (`validateInput`) |
| Autenticación      | JWT (JSON Web Tokens) + Bcrypt                    |
| Tareas programadas | Node-cron / Jobs                                  |
### Frontend (`/Front`)

| Categoría           | Herramienta                           |
| ------------------- | ------------------------------------- |
| Framework / Bundler | React + Vite                          |
| Lenguaje            | TypeScript                            |
| Ruteo               | React Router                          |
| Estilos             | Tailwind CSS + PostCSS                |
| Testing E2E         | Playwright                            |
| HTTP & Estado       | Fetch API / Axios + React AuthContext |

---
## 👥 Funcionalidades por rol

- **Usuario (Solicitante)**:
  - Crear, editar y consultar sus propios tickets de soporte.
  - Visualizar el estado de resolución, historial de cambios y asignaciones asociadas a su ticket.
  - Filtrar tickets por estado, prioridad o categoría.

- **Técnico**:
  - Visualizar los tickets asignados y la cola de solicitudes pendientes en la organización.
  - Aceptar/Tomar asignaciones de tickets e iniciar trabajos de reparación.
  - Modificar el estado del ticket (en progreso, resuelto, cerrado) o transferir/abandonar la asignación.

- **Administrador de Empresa (Admin)**:
  - Gestionar el personal de la empresa (Creación, modificación y baja de Usuarios y Técnicos).
  - Administrar oficinas, departamentos y sedes de la empresa.
  - Administrar catálogos del sistema: Categorías de incidentes, Estados y Niveles de Prioridad.
  - Visualizar métricas e incidencias globales de la empresa.

- **SuperAdmin**:
  - Control global multi-tenant de la plataforma.
  - Crear, modificar y deshabilitar Empresas clientes.
  - Dar de alta y gestionar cuentas Administradoras de cada empresa.
---
## 🏗 Arquitectura del sistema

El proyecto sigue una estructura de monorepo dividida en **`Back`** y **`Front`**.

```
                           ┌──────────────────────────┐
                           │      React + Vite        │
                           │   (Frontend / Single    │
                           │     Page Application)    │
                           └─────────────┬────────────┘
                                         │
                                   HTTP / REST API
                                         │
                           ┌─────────────▼────────────┐
                           │   Express + TypeScript   │
                           │   (Backend / REST API)   │
                           └─────────────┬────────────┘
                                         │
                 ┌───────────────────────┼───────────────────────┐
                 │                       │                       │
          ┌──────▼──────┐         ┌──────▼──────┐         ┌──────▼──────┐
          │ Middlewares │         │ Controllers │         │   Services  │
          │(Auth/Roles) │         │    (HTTP)   │         │  (Business) │
          └─────────────┘         └─────────────┘         └──────┬──────┘
                                                                 │
                                                          ┌──────▼──────┐
                                                          │  DAO / Base │
                                                          │   de Datos  │
                                                          └─────────────┘
```
### Capas del Backend (`Back/src/`)
- **`routes`**: Define los endpoints REST y encadena middlewares de validación, JWT y control de roles.
- **`controller`**: Gestiona la petición/respuesta HTTP. No contiene lógica de base de datos ni reglas complejas.
- **`service`**: Implementa las reglas de negocio (procesamiento de estados, asignación de tickets, hashes).
- **`DAO` (Data Access Object)**: Capa aislada para el acceso y consulta de datos.
- **`entity`**: Definición de las entidades y esquemas de persistencia.
- **`DTO`**: Data Transfer Objects para la validación tipada del payload de entrada y salida.
---
## 📊 Modelo de dominio

El sistema modela las siguientes entidades principales:

- **Persona**: Datos demográficos comunes (Nombre, Apellido, DNI, Email).
- **Usuario / Tecnico / Admin**: Extensión y especialización de roles del sistema.
- **Empresa**: Organización a la que pertenecen los usuarios, técnicos y oficinas.
- **Oficina**: Ubicación o área física dentro de una empresa.
- **Ticket**: Incidencia o solicitud reportada por un Usuario, asociada a una Oficina, Categoría, Prioridad y Estado.
- **Asignacion**: Registro de vinculación entre un Técnico y un Ticket para su resolución.
- **Categoria**, **Estado**, **Prioridad**: Entidades de parametrización del flujo de trabajo.
---
## 💡 Decisiones de diseño
### Separación de Responsabilidades y Patrón DAO / Service / Controller
El backend aísla la capa de transporte (Express Controllers) de la lógica de dominio (Services) y la persistencia (DAOs). Esto facilita las pruebas unitarias y permite modificar la base de datos o ajustar el flujo de trabajo sin impactar las rutas HTTP.
### Tipado Estricto de DTOs y Validación Perimetral
Cada petición que modifica o consulta datos cuenta con su correspondiente clase o interfaz DTO (`CreateTicket.dto.ts`, `ModifyUsuario.dto.ts`, etc.). Un middleware dedicado (`validateInput.middleware.ts`) valida las entradas antes de que lleguen a la lógica del servidor.
### Control de Acceso Basado en Roles (RBAC)
Las rutas del servidor están protegidas por middlewares en cadena: `auth.middleware.ts` valida la vigencia del token JWT y `role.middleware.ts` restringe la ejecución según los roles autorizados (`SuperAdmin`, `Admin`, `Tecnico`, `Usuario`).
### Arquitectura de Frontend Basada en Componentes Reutilizables
El frontend en React aísla layouts (`DashboardLayout`, `GuestLayout`), componentes de UI (Formularios, Tablas, Modales) y capas de servicio (`src/services/`) organizadas por entidad.

---
## ✅ Requisitos previos

- **Node.js** v18 o superior.
- **npm** o **pnpm** como gestor de paquetes.
- **MySQL** u otro motor SQL compatible para la base de datos backend.
---
## ⚙️ Instalación
### 1. Clonar el repositorio

```bash
git clone https://github.com/tu-usuario/TickeTI-DSW.git
cd TickeTI-DSW
```
### 2. Configurar y levantar el Backend

```bash
cd Back
npm install
```

Crear un archivo `.env` en la carpeta `Back` basándose en el ejemplo:

```env
PORT=3000
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=tu_password
DB_NAME=ticketi_db
JWT_SECRET=tu_clave_secreta_jwt
```
### 3. Configurar y levantar el Frontend
En otra terminal:

```bash
cd Front
npm install
```

Crear un archivo `.env` en la carpeta `Front`:

```env
VITE_API_URL=http://localhost:3000
```
---
## ▶️ Ejecución
### En Desarrollo
#### Backend:
```bash
cd Back
npm run dev
```
*(El servidor de API iniciará habitualmente en `http://localhost:3000`)*
#### Frontend:
```bash
cd Front
npm run dev
```
*(El cliente Vite iniciará habitualmente en `http://localhost:5173`)*

---
## 🌱 Datos iniciales (Seeders)

El backend cuenta con scripts de inicialización de datos para poblar la base de datos con información de prueba y un usuario `SuperAdmin` por defecto.

Para ejecutar los seeders del backend:

```bash
cd Back
npm run seed
```

Esto generará automáticamente:
- **Estados iniciales**: Abierto, En Proceso, Resuelto, Cerrado.
- **Prioridades por defecto**: Baja, Media, Alta, Crítica.
- **Categorías base**: Hardware, Software, Redes, Infraestructura.
- **SuperAdmin por defecto** para la administración de la plataforma.
- Empresas, Oficinas, Usuarios y Técnicos de demostración.
---
## 🔐 Autenticación y rutas protegidas

### Flujo de autenticación

1. El usuario envía sus credenciales mediante `POST /auth/login`.
2. El backend verifica las credenciales y responde con un **JWT Token** que contiene la identidad y el rol del usuario.
3. El frontend almacena el token en el `AuthContext` y lo adjunta en los encabezados `Authorization: Bearer <token>` de las peticiones subsiguientes.
4. El componente `<ProtectedRoute/>` en React evalúa si el usuario autenticado posee el rol requerido para acceder a las vistas especificadas.
---
## 🗺 Mapa de rutas y Endpoints
### Vistas del Frontend (`Front/src/pages/`)

| Ruta                | Roles permitidos       | Descripción                                      |
| ------------------- | ---------------------- | ------------------------------------------------ |
| `/`                 | Público                | Página de inicio (Landing page)                  |
| `/login`            | Público                | Formulario de inicio de sesión                   |
| `/superadmin`       | `SuperAdmin`           | Gestión central de Empresas y Administradores    |
| `/admin`            | `Admin`                | Dashboard principal de administración de empresa |
| `/usuarios`         | `Admin`, `Tecnico`     | Gestión de Usuarios y Técnicos                   |
| `/Oficina`          | `Admin`                | Gestión de Oficinas y Sedes                      |
| `/categorias/crud`  | `Admin`                | ABM de Categorías                                |
| `/prioridades/crud` | `Admin`                | ABM de Niveles de Prioridad                      |
| `/estados/crud`     | `Admin`                | ABM de Estados de Ticket                         |
| `/tecnico`          | `Tecnico`              | Dashboard técnico y métricas                     |
| `/mis-asignaciones` | `Tecnico`              | Lista de tickets asignados al técnico            |
| `/Mis-tickets`      | `Usuario`, `Tecnico`   | Panel general de tickets creados                 |
| `/ajustes`          | Todos los autenticados | Cambio de contraseña y perfil                    |
### Endpoints principales del Backend (`Back/src/`)

- **Autenticación**: `POST /auth/login`
- **Tickets**: `GET /ticket`, `POST /ticket`, `PUT /ticket/:id`, `PATCH /ticket/:id/estado`, `DELETE /ticket/:id`
- **Asignaciones**: `GET /asignacion`, `POST /asignacion`, `PATCH /asignacion/:id/estado`
- **Usuarios & Personas**: `GET /usuario`, `POST /usuario`, `PUT /usuario/:id`, `PATCH /persona/change-password`
- **Empresas**: `GET /empresa`, `POST /empresa`, `PUT /empresa/:id`, `DELETE /empresa/:id`
- **Oficinas**: `GET /oficina`, `POST /oficina`, `PUT /oficina/:id`, `DELETE /oficina/:id`
- **Catálogos**: Endpoints CRUD para `/categoria`, `/prioridad` y `/estado`.
---
## 📂 Estructura del proyecto

```
TickeTI-DSW/
├── Back/                           # Código del Backend (Node.js + Express)
│   ├── src/
│   │   ├── admin/                  # Módulo de administración
│   │   ├── asignacion/             # Módulo de asignaciones técnico-ticket
│   │   ├── auth/                   # Módulo de autenticación (Login/JWT)
│   │   ├── categoria/              # CRUD de categorías
│   │   ├── config/
│   │   │   └── DataBase/           # Configuración de BD y Seeders
│   │   ├── empresa/                # Gestión multi-tenant de empresas
│   │   ├── estado/                 # CRUD de estados de ticket
│   │   ├── jobs/                   # Tareas en segundo plano / Cron jobs
│   │   ├── middlewares/            # Auth, Roles, Handler de Errores, Validación
│   │   ├── oficinas/               # CRUD de oficinas
│   │   ├── persona/                # Entidad base de personas
│   │   ├── prioridad/              # CRUD de prioridades
│   │   ├── tecnico/                # Módulo de técnicos
│   │   ├── ticket/                 # Módulo principal de Tickets
│   │   ├── usuario/                # Módulo de usuarios finales
│   │   ├── utils/                  # Mappers de error, respuestas estándar API
│   │   └── app.ts                  # Inicialización del servidor Express
│   ├── package.json
│   └── tsconfig.json
│
├── Front/                          # Código del Frontend (React + Vite)
│   ├── src/
│   │   ├── assets/                 # Recursos estáticos e imágenes
│   │   ├── components/             # Componentes UI de layout, formularios y tablas
│   │   ├── context/                # Contexto global de autenticación (AuthContext)
│   │   ├── helpers/                # Funciones auxiliares de filtrado y formato
│   │   ├── interfaces/ & models/   # Definiciones de modelos y tipos TypeScript
│   │   ├── pages/                  # Vistas organizadas por rol y funcionalidad
│   │   ├── requests/ & responses/  # Tipos para la comunicación HTTP
│   │   ├── services/               # Llamadas a la API agrupadas por entidad
│   │   ├── App.tsx                 # Enrutador principal de React
│   │   └── main.tsx                # Punto de entrada de React
│   ├── tests/                      # Tests E2E con Playwright
│   ├── package.json
│   ├── tailwind.config.js
│   └── vite.config.js
│
└── Proposal.md                     # Documento original de propuesta del proyecto
```
---
## 🚨 Manejo de errores

El servidor implementa un manejador global de errores (`errorHandler.middleware.ts`) que estandariza las respuestas en formato JSON:

```json
{
  "success": false,
  "message": "Descripción comprensible del error",
  "error": "Detalle técnico o código interno"
}
```

- **400 Bad Request**: Errores de validación en DTOs o datos faltantes.
- **401 Unauthorized**: Ausencia o invalidez del token JWT.
- **403 Forbidden**: El usuario autenticado no posee los permisos de rol suficientes.
- **404 Not Found**: Recurso solicitado no encontrado en la base de datos.
- **409 Conflict**: Infracción de restricciones de unicidad (ej. DNI o email duplicado).
- **500 Internal Server Error**: Errores no controlados del servidor.

https://drive.google.com/file/d/1TTASr6qYMNAaap6kCXzykvyuBbd7hI4a/view?usp=sharing
