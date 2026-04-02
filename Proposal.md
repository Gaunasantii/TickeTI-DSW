# Propuesta TP DSW

## Grupo
### Integrantes
* legajo - Apellido(s), Nombre(s)
* legajo - Apellido(s), Nombre(s)
* legajo - Apellido(s), Nombre(s)
* legajo - Apellido(s), Nombre(s)

### Repositorios
*[FullStack app](http://hyperlinkToGihubOrGitlab)

## Tema
### Descripción
Aplicacion de tipo DeskHelp con sistema de tickets agrupados por categoria y/o Urgencia, donde los mismos son cargados por usuarios
y posteriormente resueltos o reasignados a otro tecnico por el administrador del sistema.

### Modelo
![imagen del modelo](https://drive.google.com/file/d/1TTASr6qYMNAaap6kCXzykvyuBbd7hI4a/view?usp=drive_link)

diagramas con [Mermaid](https://mermaid.js.org) en lugar de imágenes.

## Alcance Funcional 

### Alcance Mínimo

Regularidad:
|Req|Detalle|
|:-|:-|
|CRUD simple|1. CRUD Categoria Ticket<br>2. CRUD Prioridad Ticket<br>3. CRUD Oficina<br>4.CRUD Tecnico|
|CRUD dependiente|1. CRUD USUARIO {depende de} CRUD Oficina<br>2. CRUD Ticket  {depende de} CRUD Usuario, CRUD Ticket Categoria y CRUD Ticket Prioridad|
|Listado<br>+<br>detalle| 1. Listado de tickets filtrado por categoria, muestra nroTicket, Prioridad,DniUsuario , estado y Descripccion => detalle CRUD Ticket<br> 2. Listado de tickets Filtrado por estado, muestra nro de habitación, fecha inicio y fin estadía, estado y nombre del cliente => detalle muestra datos completos de la reserva y del cliente|
|CUU/Epic|1. Realizar el alta de un ticket<br>2. Registrar la solucion de un ticket|


Adicionales para Aprobación
|Req|Detalle|
|:-|:-|
|CRUD |1. CRUD Tipo Habitacion<br>2. CRUD Servicio<br>3. CRUD Localidad<br>4. CRUD Provincia<br>5. CRUD Habitación<br>6. CRUD Empleado<br>7. CRUD Cliente|
|CUU/Epic|1. Reservar una habitación para la estadía<br>2. Realizar el check-in de una reserva<br>3. Realizar el check-out y facturación de estadía y servicios|


### Alcance Adicional Voluntario

*Nota*: El Alcance Adicional Voluntario es opcional, pero ayuda a que la funcionalidad del sistema esté completa y será considerado en la nota en función de su complejidad y esfuerzo.

|Req|Detalle|
|:-|:-|
|Listados |1. Estadía del día filtrado por fecha muestra, cliente, habitaciones y estado <br>2. Reservas filtradas por cliente muestra datos del cliente y de cada reserve fechas, estado cantidad de habitaciones y huespedes|
|CUU/Epic|1. Consumir servicios<br>2. Cancelación de reserva|
|Otros|1. Envío de
