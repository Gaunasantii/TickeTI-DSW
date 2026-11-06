import { Router } from "express";
import { asignacioncontroller } from "./asignacion.controller.js";
import { ValidationMiddleware } from "../middlewares/validateInput.middleware.js";
import { CreateAsignacionSchema } from "./DTO/CreateAsignacion.dto.js";
import { ChangeStateAsignacionSchema } from "./DTO/ChangeStateAsignacion.dto.js";
import { FindOneAsignacionSchema } from "./DTO/DeleteAsignacion.js";
import { PaginateAsignacionQuerySchema } from "./DTO/PaginateAsignacionQuery.dto.js";
import { authenticateToken } from "../middlewares/auth.middleware.js";
import { authorizeRoles } from "../middlewares/role.middleware.js";

export const asignacionrouter:Router = Router();

/**
 * @openapi
 * /Mis-asignaciones/{id}/abandonar:
 *   post:
 *     tags:
 *       - Asignaciones
 *     summary: Abandonar una asignación (Técnicos)
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           example: 5
 *     responses:
 *       200:
 *         description: Asignación abandonada exitosamente
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

asignacionrouter.post('/Mis-asignaciones/:id/abandonar',authenticateToken,authorizeRoles('tecnico'),ValidationMiddleware(FindOneAsignacionSchema),asignacioncontroller.abandonarAsignacion);

/**
 * @openapi
 * /Mis-asignaciones/pendientes:
 *   get:
 *     tags:
 *       - Asignaciones
 *     summary: Obtener asignaciones pendientes paginadas del técnico autenticado
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
 *         description: Listado paginado de asignaciones pendientes
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
 *                         $ref: '#/components/schemas/AsignacionOutDto'
 *       400:
 *         $ref: '#/components/responses/InvalidDataResponse'
 *       401:
 *         $ref: '#/components/responses/UnauthorizedResponse'
 *       403:
 *         $ref: '#/components/responses/ForbiddenResponse'
 */

asignacionrouter.get('/Mis-asignaciones/pendientes',authenticateToken,authorizeRoles('tecnico'),ValidationMiddleware(PaginateAsignacionQuerySchema),asignacioncontroller.getMisAsignacionesPendientesPaginated);

/**
 * @openapi
 * /asignaciones:
 *   get:
 *     tags:
 *       - Asignaciones
 *     summary: Obtener todas las asignaciones
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: Listado de asignaciones recuperado
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
 *                         $ref: '#/components/schemas/AsignacionOutDto'
 *       401:
 *         $ref: '#/components/responses/UnauthorizedResponse'
 * 
 *   post:
 *     tags:
 *       - Asignaciones
 *     summary: Crear/Asignar un ticket a un técnico (Admin / Técnico)
 *     security:
 *       - cookieAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateAsignacionDto'
 *     responses:
 *       201:
 *         description: Asignación creada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: '#/components/schemas/ApiResponseSucces'
 *                 - type: object
 *                   properties:
 *                     data:
 *                       $ref: '#/components/schemas/AsignacionOutDto'
 *       400:
 *         $ref: '#/components/responses/InvalidDataResponse'
 *       401:
 *         $ref: '#/components/responses/UnauthorizedResponse'
 *       403:
 *         $ref: '#/components/responses/ForbiddenResponse'
 */

asignacionrouter.get('/asignaciones',authenticateToken,asignacioncontroller.findAll);
asignacionrouter.post('/asignaciones',authenticateToken,authorizeRoles('admin','tecnico'),ValidationMiddleware(CreateAsignacionSchema),asignacioncontroller.createAsignacion);
asignacionrouter.put('/asignaciones/:id',authenticateToken,ValidationMiddleware(ChangeStateAsignacionSchema),asignacioncontroller.ChangeStateAsignacion);
asignacionrouter.delete('/asignaciones/:id',authenticateToken,ValidationMiddleware(FindOneAsignacionSchema),asignacioncontroller.deleteAsignacion);