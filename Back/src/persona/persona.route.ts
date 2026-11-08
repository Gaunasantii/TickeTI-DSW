import { Router } from "express";
import { ValidationMiddleware } from "../middlewares/validateInput.middleware.js";
import { PaginatedPersonSchema } from "./DTO/PersonPaginatedQuery.dto.js";
import { ChangePasswordSchema } from "./DTO/ChangePassword.dto.js";
export const personrouter: Router = Router();

import { PersonController } from "./person.controller.js";
import { authenticateToken } from "../middlewares/auth.middleware.js";
import { authorizeRoles } from "../middlewares/role.middleware.js";

/**
 * @openapi
 * /persons/paginate:
 *   get:
 *     tags:
 *       - Personas
 *     summary: Obtener usuarios y técnicos paginados
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         required: true
 *         schema:
 *           type: string
 *           example: "1"
 *         description: Número de página
 *       - in: query
 *         name: cantPerPage
 *         required: true
 *         schema:
 *           type: string
 *           example: "10"
 *         description: Cantidad por página
 *     responses:
 *       200:
 *         description: Listado paginado de personas obtenido exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: '#/components/schemas/ApiResponsePagination'
 *                 - type: object
 *                   properties:
 *                     data:
 *                       $ref: '#/components/schemas/PersonPaginatedDto'
 *       400:
 *         $ref: '#/components/responses/InvalidDataResponse'
 *       401:
 *         $ref: '#/components/responses/UnauthorizedResponse'
 *       403:
 *         $ref: '#/components/responses/ForbiddenResponse'
 */

personrouter.get("/persons/paginate",authenticateToken,authorizeRoles('admin','tecnico'),ValidationMiddleware(PaginatedPersonSchema),
PersonController.PaginateUserAndTecnicos);

/**
 * @openapi
 * /persona/cambiar-password:
 *   put:
 *     tags:
 *       - Personas
 *     summary: Cambiar la contraseña de una persona
 *     security:
 *       - cookieAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ChangePasswordDto'
 *     responses:
 *       200:
 *         description: Contraseña actualizada correctamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiResponseSucces'
 *       400:
 *         $ref: '#/components/responses/InvalidDataResponse'
 *       401:
 *         $ref: '#/components/responses/UnauthorizedResponse'
 *       404:
 *         $ref: '#/components/responses/NotFoundResponse'
 */

personrouter.put("/persona/cambiar-password", authenticateToken, ValidationMiddleware(ChangePasswordSchema), PersonController.changePassword);