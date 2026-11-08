import { Router } from "express";
export const userrouter: Router = Router();
import { usercontroller } from "./usuario.controller.js";
import { authenticateToken } from "../middlewares/auth.middleware.js";
import { authorizeRoles } from "../middlewares/role.middleware.js";
import { ValidationMiddleware } from "../middlewares/validateInput.middleware.js";
import { createUsuarioSchema } from "./DTO/CreateUsuario.dto.js";
import { ModifyUsuarioSchema } from "./DTO/ModifyUsuario.dto.js";
import { DeleteUsuarioSchema } from "./DTO/DeleteUsuario.dto.js";
import { PaginatedUserSchema } from "./DTO/PaginatedUser.dto.js";
import blockEndpoint from "../middlewares/block.middleware.js";

/**
 * @openapi
 * /usuarios:
 *   post:
 *     tags:
 *       - Usuarios
 *     summary: Crear un nuevo usuario
 *     security:
 *       - cookieAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateUsuarioDto'
 *     responses:
 *       201:
 *         description: Usuario creado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: '#/components/schemas/ApiResponseSucces'
 *                 - type: object
 *                   properties:
 *                     data:
 *                       $ref: '#/components/schemas/UsuarioOutDto'
 *       400:
 *         $ref: '#/components/responses/InvalidDataResponse'
 *       401:
 *         $ref: '#/components/responses/UnauthorizedResponse'
 *       403:
 *         $ref: '#/components/responses/ForbiddenResponse'
 * 
 *   get:
 *     tags:
 *       - Usuarios
 *     summary: Obtener el listado completo de usuarios
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: Listado de usuarios obtenido correctamente
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: '#/components/schemas/ApiResponseSucces'
 *                 - type: object
 *                   properties:
 *                     data:
 *                       type: array
 *                       items:
 *                         $ref: '#/components/schemas/UsuarioOutDto'
 *       401:
 *         $ref: '#/components/responses/UnauthorizedResponse'
 *       403:
 *         $ref: '#/components/responses/ForbiddenResponse'
 *       405:
 *         $ref: '#/components/responses/BlockedEndpointResponse'
 */

// Solo un administrador autenticado puede listar o crear usuarios
userrouter.post("/usuarios", authenticateToken, authorizeRoles("admin"),ValidationMiddleware(createUsuarioSchema), usercontroller.createUser);
userrouter.get("/usuarios", blockEndpoint, usercontroller.findAll);

/**
 * @openapi
 * /usuarios/{dni}:
 *   put:
 *     tags:
 *       - Usuarios
 *     summary: Modificar los datos de un usuario por DNI
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: dni
 *         required: true
 *         schema:
 *           type: string
 *           example: "47107024"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ModifyUsuarioDto'
 *     responses:
 *       200:
 *         description: Usuario actualizado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: '#/components/schemas/ApiResponseSucces'
 *                 - type: object
 *                   properties:
 *                     data:
 *                       $ref: '#/components/schemas/UsuarioOutDto'
 *       400:
 *         $ref: '#/components/responses/InvalidDataResponse'
 *       401:
 *         $ref: '#/components/responses/UnauthorizedResponse'
 *       404:
 *         $ref: '#/components/responses/NotFoundResponse'
 * 
 *   delete:
 *     tags:
 *       - Usuarios
 *     summary: Eliminar un usuario por DNI
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: dni
 *         required: true
 *         schema:
 *           type: string
 *           example: "47107024"
 *     responses:
 *       200:
 *         description: Usuario eliminado correctamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiResponseSucces'
 *       401:
 *         $ref: '#/components/responses/UnauthorizedResponse'
 *       403:
 *         $ref: '#/components/responses/ForbiddenResponse'
 *       404:
 *         $ref: '#/components/responses/NotFoundResponse'
 */

// Rutas de modificación y baja protegidas para admin
userrouter.put("/usuarios/:dni", authenticateToken, authorizeRoles("admin"),ValidationMiddleware(ModifyUsuarioSchema), usercontroller.updateUser);
userrouter.delete("/usuarios/:dni", authenticateToken, authorizeRoles("admin"),ValidationMiddleware(DeleteUsuarioSchema), usercontroller.deleteUser);

/**
 * @openapi
 * /usuarios/paginated:
 *   get:
 *     tags:
 *       - Usuarios
 *     summary: Obtener listado de usuarios con paginación
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         required: true
 *         schema:
 *           type: string
 *           example: "1"
 *       - in: query
 *         name: cantPerPage
 *         required: true
 *         schema:
 *           type: string
 *           example: "10"
 *     responses:
 *       200:
 *         description: Lista paginada recuperada
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: '#/components/schemas/ApiResponsePagination'
 *                 - type: object
 *                   properties:
 *                     data:
 *                       $ref: '#/components/schemas/UsuarioPaginatedOutDto'
 *       400:
 *         $ref: '#/components/responses/InvalidDataResponse'
 *       401:
 *         $ref: '#/components/responses/UnauthorizedResponse'
 *       405:
 *         $ref: '#/components/responses/BlockedEndpointResponse'
 */

userrouter.get("/usuarios/paginated", blockEndpoint, usercontroller.paginatedUsers);