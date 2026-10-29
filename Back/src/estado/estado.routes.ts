import { Router } from "express";
import { estadoController } from "./estado.controller.js";
import { ValidationMiddleware } from "../middlewares/validateInput.middleware.js";
import { CreateEstadoSchema } from "./DTO/CreateEstado.dto.js";
import { FindOneEstadoSchema } from "./DTO/FindOneEstado.dto.js";
import { PaginateEstadoQuerySchema } from "./DTO/PaginateEstadoQuery.dto.js";
import { authenticateToken } from "../middlewares/auth.middleware.js";
import { authorizeRoles } from "../middlewares/role.middleware.js";
import { UpdateEstadoSchema } from "./DTO/UpdateEstado.dto.js";

export const estadoRouter:Router = Router();


/**
 * @openapi
 * /estados/paginated:
 *   get:
 *     summary: Obtener estados paginados
 *     tags:
 *       - Estado
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         required: true
 *         schema:
 *           type: integer
 *       - in: query
 *         name: cantPerPage
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Lista de estados paginado
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *               - $ref: '#/components/schemas/ApiResponsePagination'
 *               - type: object
 *                 properties:
 *                   data:
 *                     type: array
 *                     items:
 *                       $ref: '#/components/schemas/EstadoOutDto'
 *       401:
 *         $ref: '#/components/responses/UnauthorizedResponse'
 *       403:
 *         $ref: '#/components/responses/ForbiddenResponse'
 *       400:
 *         $ref: '#/components/responses/InvalidDataResponse'
 */
estadoRouter.get('/estados/paginated',authenticateToken,ValidationMiddleware(PaginateEstadoQuerySchema),estadoController.getPaginated);

/** 
 * @openapi
 * /estados:
 *   post:
 *     summary: Crear un nuevo estado
 *     security:
 *       - cookieAuth: []
 *     tags:
 *       - Estado
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateEstadoDto'
 *     responses:
 *       201:
 *         description: Estado creado exitosamente
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
 *         $ref: '#/components/responses/InvalidDataResponse'
 *       401:
 *         $ref: '#/components/responses/UnauthorizedResponse'
 *       403:
 *         $ref: '#/components/responses/ForbiddenResponse'
 */
estadoRouter.post('/estados',authenticateToken,authorizeRoles('admin'),ValidationMiddleware(CreateEstadoSchema),estadoController.createNew);

/**
 * @openapi
 * /estados:
 *   get:
 *     summary: Obtener todos los estados
 *     security:
 *       - cookieAuth: []
 *     tags:
 *       - Estado
 *     responses:
 *       200:
 *         description: Lista de estados
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
 *                         $ref: '#/components/schemas/EstadoOutDto'
 *       401:
 *         $ref: '#/components/responses/UnauthorizedResponse'
 *       403:
 *         $ref: '#/components/responses/ForbiddenResponse'
 */
estadoRouter.get('/estados',authenticateToken,estadoController.findAll)

/**
 * @openapi
 * /estados/{id}:
 *   get:
 *     summary: Obtener un estado por ID
 *     security:
 *       - cookieAuth: []
 *     tags:
 *       - Estado
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del estado a obtener
 *     responses:
 *       200:
 *         description: Estado obtenido exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: '#/components/schemas/ApiResponseSucces'
 *                 - type: object
 *                   properties:
 *                     data:
 *                       $ref: '#/components/schemas/EstadoOutDto'
 *       400:
 *         $ref: '#/components/responses/InvalidDataResponse'
 *       401:
 *         $ref: '#/components/responses/UnauthorizedResponse'
 *       403:
 *         $ref: '#/components/responses/ForbiddenResponse'
 */
estadoRouter.get('/estados/:id',authenticateToken,ValidationMiddleware(FindOneEstadoSchema),estadoController.findOne)

/**
 * @openapi
 * /estados/{id}:
 *   delete:
 *     summary: Eliminar un estado por ID
 *     security:
 *       - cookieAuth: []
 *     tags:
 *       - Estado
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del estado a eliminar
 *     responses:
 *       200:
 *         description: Estado eliminado exitosamente
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
 *         $ref: '#/components/responses/InvalidDataResponse'
 *       401:
 *         $ref: '#/components/responses/UnauthorizedResponse'
 *       403:
 *         $ref: '#/components/responses/ForbiddenResponse'
 *       404:
 *         $ref: '#/components/responses/NotFoundResponse'
 */
estadoRouter.delete('/estados/:id',authenticateToken,authorizeRoles('admin'),ValidationMiddleware(FindOneEstadoSchema),estadoController.delete)

/**
 * @openapi
 * /estados/{id}:
 *   put:
 *     summary: Actualizar un estado por ID
 *     security:
 *       - cookieAuth: []
 *     tags:
 *       - Estado
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del estado a actualizar
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateEstadoDto'
 *     responses:
 *       200:
 *         description: Estado actualizado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: '#/components/schemas/ApiResponseSucces'
 *                 - type: object
 *                   properties:
 *                     data:
 *                       $ref: '#/components/schemas/EstadoOutDto'
 *       400:
 *         $ref: '#/components/responses/InvalidDataResponse'
 *       401:
 *         $ref: '#/components/responses/UnauthorizedResponse'
 *       403:
 *         $ref: '#/components/responses/ForbiddenResponse'
 *       404:
 *         $ref: '#/components/responses/NotFoundResponse'
 */
estadoRouter.put('/estados/:id',authenticateToken,authorizeRoles('admin'),ValidationMiddleware(UpdateEstadoSchema),estadoController.update);
