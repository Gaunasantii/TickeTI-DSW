# Propuesta TP DSW

## Grupo
### Integrantes
* 53808 - Villalba, German Agustin
* 51207 - Gauna, Santiago
* 44971 - Román, Gastón Nicolás
* 51276 - Jordan, Nicolas

### Repositorios
*[FullStack app](http://hyperlinkToGihubOrGitlab)

## Tema
### Descripción
Aplicación de tipo Helpdesk con sistema de tickets agrupados por categoría y/o urgencia. Los mismos son generados por los usuarios y posteriormente resueltos o reasignados a otro técnico por el administrador del sistema.

### Modelo

<img width="887" height="788" alt="Modelo_usuario_rol drawio" src="https://github.com/user-attachments/assets/2d1e1327-0883-4f7f-afdd-15a55e595b79" />

## Alcance Funcional 

### Alcance Mínimo

Regularidad:
|Req|Detalle|
|:-|:-|
|CRUD simple|1. CRUD Categoria Ticket<br>2. CRUD Prioridad Ticket<br>3. CRUD Oficina<br>4.CRUD Tecnico|
|CRUD dependiente|1. CRUD USUARIO {depende de} CRUD Oficina<br>2. CRUD Ticket  {depende de} CRUD Usuario, CRUD Ticket Categoria y CRUD Ticket Prioridad|
|Listado<br>+<br>detalle| 1. Listado de tickets filtrado por categoria, muestra nroTicket, Prioridad,DniUsuario , estado y Descripccion => detalle CRUD Ticket<br> 2. Listado de tickets Filtrado por estado, muestra nroTicket, Prioridad,DniUsuario y Descripccion => detalle muestra datos completos del ticket y el usuario que lo creo|
|CUU/Epic|1. Realizar el alta de un ticket<br>2. Registrar la solucion de un ticket <br> 2. Cancelación de ticket|


Adicionales para Aprobación
*Nota*:si se te ocurre algun otro agregalo
|Req|Detalle|
|:-|:-|
|CRUD |1. CRUD Categoria Ticket<br>2. CRUD Prioridad Ticket<br>3. CRUD Usuario<br>4. CRUD Tecnico<br>5. CRUD Ticket<br>6. CRUD Oficina|
|CUU/Epic|1. Realizar el alta de un ticket<br>2. Registrar la solucion de un ticket|


### Alcance Adicional Voluntario

|Req|Detalle|
|:-|:-|
|Listados |1. Ticket filtrado por Usuario,muestra nroTicket, Prioridad,  estado y Descripccion <br> 2. Ticket filtrado por Prioridad,muestra nroTicket, DniUsuario, estado y Descripccion|
|CUU/Epic||
|Otros|1. Envio de notificaciones via telefono a tecnicos cuando un ticket asignado se encuentre proximo a su fecha limite
