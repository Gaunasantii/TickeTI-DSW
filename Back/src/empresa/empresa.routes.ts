import { Router } from "express";
import { empresacontroller } from "./empresa.controller.js";
import { ValidationMiddleware } from "../middlewares/validateInput.middleware.js";
import { CreateEmpresaSchema } from "./DTO/CreateEmpresa.dto.js";
import { ModifyEmpresaSchema } from "./DTO/ModifyEmpresa.dto.js";
import {DeleteEmpresaSchema}  from "./DTO/DeleteEmpresa.dto.js";
import { authenticateToken } from "../middlewares/auth.middleware.js";
import { authorizeRoles } from "../middlewares/role.middleware.js";
import { PaginatedEmpresaQuerySchema } from "./DTO/PaginateEmpresa.dto.js";

export const empresarouter:Router = Router();

/**
 * @openapi
 * /empresas:
 *   post:
 *     tags:
 *       - Empresas
 *     summary: Crear una nueva empresa
 *     security:
 *       - cookieAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateEmpresaDto'
 *     responses:
 *       201:
 *         description: Empresa creada correctamente
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: '#/components/schemas/ApiResponseSucces'
 *                 - type: object
 *                   properties:
 *                     data:
 *                       $ref: '#/components/schemas/EmpresaOutDto'
 *       400:
 *         $ref: '#/components/responses/InvalidDataResponse'
 *       401:
 *         $ref: '#/components/responses/UnauthorizedResponse'
 *       403:
 *         $ref: '#/components/responses/ForbiddenResponse'
*/

empresarouter.post("/empresas",authenticateToken,authorizeRoles('S_ADMIN'),ValidationMiddleware(CreateEmpresaSchema), empresacontroller.createEmpresa);

/**
 * @openapi
 * /empresas/paginated:
 *   get:
 *     tags:
 *       - Empresas
 *     summary: Obtener listado de empresas con paginación
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         required: true
 *         schema:
 *           type: integer
 *           example: 1
 *       - in: query
 *         name: cantPerPage
 *         required: true
 *         schema:
 *           type: integer
 *           example: 10
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
 *                       type: array
 *                       items:
 *                         $ref: '#/components/schemas/EmpresaOutDto'
 *       400:
 *         $ref: '#/components/responses/InvalidDataResponse'
 *       401:
 *         $ref: '#/components/responses/UnauthorizedResponse'
 */

empresarouter.get("/empresas/paginated",authenticateToken,authorizeRoles('S_ADMIN'),ValidationMiddleware(PaginatedEmpresaQuerySchema),empresacontroller.getPaginatedEmpresa);

/**
 * @openapi
 * /empresas:
 *   get:
 *     tags:
 *       - Empresas
 *     summary: Obtiene el listado completo de empresas
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: Listado de empresas
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
 *                         $ref: '#/components/schemas/EmpresaOutDto'
 *       401:
 *         $ref: '#/components/responses/UnauthorizedResponse'
 *       404:
 *         $ref: '#/components/responses/NotFoundResponse'
 */
empresarouter.get("/empresas",authorizeRoles('S_ADMIN'), authenticateToken,empresacontroller.findAll);

/**
 * @openapi
 * /empresas/{id}:
 *   put:
 *     tags:
 *       - Empresas
 *     summary: Actualizar datos de una empresa
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           example: 1
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ModifyEmpresaDto'
 *     responses:
 *       200:
 *         description: Empresa actualizada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: '#/components/schemas/ApiResponseSucces'
 *                 - type: object
 *                   properties:
 *                     data:
 *                       $ref: '#/components/schemas/EmpresaOutDto'
 *       400:
 *         $ref: '#/components/responses/InvalidDataResponse'
 *       401:
 *         $ref: '#/components/responses/UnauthorizedResponse'
 *       404:
 *         $ref: '#/components/responses/NotFoundResponse'
*/
empresarouter.put("/empresas/:id",authenticateToken,authorizeRoles('S_ADMIN'),ValidationMiddleware(ModifyEmpresaSchema) ,empresacontroller.updateEmpresa);

/**
 * @openapi
 * /empresas/{id}:
 *   delete:
 *     tags:
 *       - Empresas
 *     summary: Eliminar una empresa por su ID
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: Empresa eliminada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiResponseSucces'
 *       401:
 *         $ref: '#/components/responses/UnauthorizedResponse'
 *       404:
 *         $ref: '#/components/responses/NotFoundResponse'
*/
empresarouter.delete("/empresas/:id",authenticateToken,authorizeRoles('S_ADMIN'),ValidationMiddleware(DeleteEmpresaSchema), empresacontroller.deleteEmpresa);
