import { Router } from "express";
export const oficinarouter:Router = Router();
import { oficinacontroller } from "./oficina.controller.js";
import { ValidationMiddleware } from "../middlewares/validateInput.middleware.js";
import { CreateOficinaSchema } from "./DTO/CreateOficina.dto.js";
import { ModifyOficinaSchema } from "./DTO/ModifyOficina.dto.js";
import { DeleteOficinaSchema } from "./DTO/DeleteOficina.dto.js";
import { authenticateToken } from "../middlewares/auth.middleware.js";
import { authorizeRoles } from "../middlewares/role.middleware.js";
import { PaginatedOficinasQuerySchema } from "./DTO/PaginateOficina.dto.js";

/**
 * @openapi
 * /oficinas:
 *   post:
 *     tags:
 *       - Oficinas
 *     summary: Crear una nueva oficina
 *     security:
 *       - cookieAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateOficinaDto'
 *     responses:
 *       201:
 *         description: Oficina creada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: '#/components/schemas/ApiResponseSucces'
 *                 - type: object
 *                   properties:
 *                     data:
 *                       $ref: '#/components/schemas/OficinaOutDto'
 *       400:
 *         $ref: '#/components/responses/InvalidDataResponse'
 *       401:
 *         $ref: '#/components/responses/UnauthorizedResponse'
 *       403:
 *         $ref: '#/components/responses/ForbiddenResponse'
 * 
 *   get:
 *     tags:
 *       - Oficinas
 *     summary: Obtener el listado completo de oficinas
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: Listado de oficinas obtenido correctamente
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
 *                         $ref: '#/components/schemas/OficinaOutDto'
 *       401:
 *         $ref: '#/components/responses/UnauthorizedResponse'
 */


oficinarouter.post("/oficinas",authenticateToken,authorizeRoles('admin'),ValidationMiddleware(CreateOficinaSchema), oficinacontroller.createOficina);

/**
 * @openapi
 * /oficinas/{id}:
 *   get:
 *     tags:
 *       - Oficinas
 *     summary: Obtener una oficina por su ID
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
 *         description: Oficina encontrada
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: '#/components/schemas/ApiResponseSucces'
 *                 - type: object
 *                   properties:
 *                     data:
 *                       $ref: '#/components/schemas/OficinaOutDto'
 *       401:
 *         $ref: '#/components/responses/UnauthorizedResponse'
 *       404:
 *         $ref: '#/components/responses/NotFoundResponse'
 * 
 *   put:
 *     tags:
 *       - Oficinas
 *     summary: Modificar datos de una oficina
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
 *             $ref: '#/components/schemas/ModifyOficinaDto'
 *     responses:
 *       200:
 *         description: Oficina actualizada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: '#/components/schemas/ApiResponseSucces'
 *                 - type: object
 *                   properties:
 *                     data:
 *                       $ref: '#/components/schemas/OficinaOutDto'
 *       400:
 *         $ref: '#/components/responses/InvalidDataResponse'
 *       401:
 *         $ref: '#/components/responses/UnauthorizedResponse'
 *       404:
 *         $ref: '#/components/responses/NotFoundResponse'
 * 
 *   delete:
 *     tags:
 *       - Oficinas
 *     summary: Eliminar una oficina por su ID
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
 *         description: Oficina eliminada correctamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiResponseSucces'
 *       401:
 *         $ref: '#/components/responses/UnauthorizedResponse'
 *       404:
 *         $ref: '#/components/responses/NotFoundResponse'
 */

oficinarouter.get("/oficinas", authenticateToken,oficinacontroller.findAll);
oficinarouter.put("/oficinas/:id",authenticateToken,ValidationMiddleware(ModifyOficinaSchema), oficinacontroller.updateOficina);
oficinarouter.delete("/oficinas/:id",authenticateToken,ValidationMiddleware(DeleteOficinaSchema), oficinacontroller.deleteOficina);

/**
 * @openapi
 * /oficinas/paginated:
 *   get:
 *     tags:
 *       - Oficinas
 *     summary: Obtener oficinas con paginación
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
 *         description: Lista paginada de oficinas recuperada
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
 *                         $ref: '#/components/schemas/OficinaOutDto'
 *       400:
 *         $ref: '#/components/responses/InvalidDataResponse'
 *       401:
 *         $ref: '#/components/responses/UnauthorizedResponse'
 */

oficinarouter.get("/oficinas/paginated",authenticateToken,ValidationMiddleware(PaginatedOficinasQuerySchema),oficinacontroller.getOficinasPaginated)
