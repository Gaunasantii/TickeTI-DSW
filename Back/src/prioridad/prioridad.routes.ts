import { Router } from "express";
export const prioridadrouter:Router = Router();
import { prioridadcontroller } from "./prioridad.controller.js";
import { ValidationMiddleware } from "../middlewares/validateInput.middleware.js";
import { CreatePrioridadSchema } from "./DTO/CreatePrioridad.dto.js";
import { PaginatedPrioridadQuerySchema } from "./DTO/PaginatedPrioridadQuery.dto.js";
import { ModifyPrioridadSchema } from "./DTO/ModifyPrioridad.dto.js";
import { DeletePrioridadSchema } from "./DTO/DeletePrioridad.dto.js";
import { authenticateToken } from "../middlewares/auth.middleware.js";
import { authorizeRoles } from "../middlewares/role.middleware.js";


/**
 * @openapi
 * /prioridad:
 *   post:
 *     summary: Crear una nueva prioridad
 *     tags:
 *       - Prioridad
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreatePrioridadDto'
 *     responses:
 *       201:
 *         description: Prioridad creada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: '#/components/schemas/ApiResponseSucces'
 *                 - type: object
 *                   properties:
 *                     data:
 *                       type: "null"
 *                       example: null
 * 
 *       400:
 *              $ref: '#/components/responses/InvalidDataResponse'
 *       401:
 *              $ref: '#/components/responses/UnauthorizedResponse'
 *       403:
 *              $ref: '#/components/responses/ForbiddenResponse'
 */
prioridadrouter.post("/prioridad",authenticateToken,authorizeRoles('admin'),ValidationMiddleware(CreatePrioridadSchema), prioridadcontroller.createPrioridad);

/**
 * @openapi
 * /prioridad:
 *   get:
 *     summary: Obtener todas las prioridades
 *     tags:
 *       - Prioridad
 *     responses:
 *       200:
 *         description: Lista de prioridades
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
 *                         $ref: '#/components/schemas/PrioridadOutDto'
 *       401:
 *              $ref: '#/components/responses/UnauthorizedResponse'
 *       403:
 *              $ref: '#/components/responses/ForbiddenResponse'
 */
prioridadrouter.get("/prioridad",authenticateToken, prioridadcontroller.findAll);

/**
 * @openapi
 * /prioridad/{id}:
 *   put:
 *     summary: Modificar una prioridad existente
 *     tags:
 *       - Prioridad
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la prioridad a modificar
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ModifyPrioridadDto'
 *     responses:
 *       200:
 *         description: Prioridad modificada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PrioridadOutDto'
 *       400:
 *              $ref: '#/components/responses/InvalidDataResponse'
 *       401:
 *              $ref: '#/components/responses/UnauthorizedResponse'
 *       403:
 *              $ref: '#/components/responses/ForbiddenResponse'
 */
prioridadrouter.put("/prioridad/:id",authenticateToken,authorizeRoles('admin'),ValidationMiddleware(ModifyPrioridadSchema), prioridadcontroller.updatePrioridad);

/**
 * @openapi
 * /prioridad/{id}:
 *   delete:
 *     summary: Eliminar una prioridad existente
 *     tags:
 *       - Prioridad
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la prioridad a eliminar
 *     responses:
 *       200:
 *         description: Prioridad eliminada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: '#/components/schemas/ApiResponseSucces'
 *                 - type: object
 *                   properties:
 *                     data:
 *                       type: "null"
 *                       example: null
 *       400:
 *              $ref: '#/components/responses/InvalidDataResponse'
 *       401:
 *              $ref: '#/components/responses/UnauthorizedResponse'
 *       403:
 *              $ref: '#/components/responses/ForbiddenResponse'
 */
prioridadrouter.delete("/prioridad/:id",authenticateToken,authorizeRoles('admin'),ValidationMiddleware(DeletePrioridadSchema), prioridadcontroller.deletePrioridad);

/**
 * @openapi
 * /prioridad/paginated:
 *   get:
 *     summary: Obtener prioridades paginadas
 *     tags:
 *       - Prioridad
 *     parameters:
 *       - in: query
 *         name: page
 *         required: true
 *         schema:
 *           type: integer
 *         description: Número de página
 *       - in: query
 *         name: limit
 *         required: true
 *         schema:
 *           type: integer
 *         description: Cantidad de elementos por página
 *     responses:
 *       200:
 *         description: Lista de prioridades paginadas
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
 *                         $ref: '#/components/schemas/PrioridadOutDto'
 *       400:
 *              $ref: '#/components/responses/InvalidDataResponse'
 *       401:
 *              $ref: '#/components/responses/UnauthorizedResponse'
 *       403:
 *              $ref: '#/components/responses/ForbiddenResponse'
 */
prioridadrouter.get("/prioridad/paginated",authenticateToken,ValidationMiddleware(PaginatedPrioridadQuerySchema), prioridadcontroller.findPaginatedPrioridades);
