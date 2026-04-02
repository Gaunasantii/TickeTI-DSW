# Propuesta TP DSW

## Grupo
### Integrantes
* 53808 - Villalba, German Agustin
* 51207 - Gauna, Santiago
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
|Listado<br>+<br>detalle| 1. Listado de tickets filtrado por categoria, muestra nroTicket, Prioridad,DniUsuario , estado y Descripccion => detalle CRUD Ticket<br> 2. Listado de tickets Filtrado por estado, muestra nroTicket, Prioridad,DniUsuario y Descripccion => detalle muestra datos completos del ticket y el usuario que lo creo|
|CUU/Epic|1. Realizar el alta de un ticket<br>2. Registrar la solucion de un ticket|


Adicionales para Aprobación
*Nota*:si se te ocurre algun otro agregalo
|Req|Detalle|
|:-|:-|
|CRUD |1. CRUD Categoria Ticket<br>2. CRUD Prioridad Ticket<br>3. CRUD Usuario<br>4. CRUD Tecnico<br>5. CRUD Ticket<br>6. CRUD Oficina|
|CUU/Epic|1. Realizar el alta de un ticket<br>2. Registrar la solucion de un ticket|


### Alcance Adicional Voluntario

|Req|Detalle|
|:-|:-|
|Listados |1. Ticket filtrado por Usuario,muestra nroTicket, Prioridad,  estado y Descripccion <br>2. 1. Ticket filtrado por Prioridad,muestra nroTicket, DniUsuario, estado y Descripccion|
|CUU/Epic|1. Cancelación de ticket|
|Otros|1. Envio de notificaciones via telefono a tecnicos cuando un ticket asignado se encuentre proximo a su fecha limite
