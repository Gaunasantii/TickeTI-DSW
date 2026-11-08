import { Router } from "express";
export const tecnicorouter: Router = Router();
import { tecnicocontroller } from "./tecnico.controller.js";
import { ValidationMiddleware } from "../middlewares/validateInput.middleware.js";
import { createTecnicoSchema } from "./DTO/CreateTecnico.dto.js";
import { ModifyTecnicoSchema } from "./DTO/ModifyTecnico.dto.js";
import { DeleteTecnicoSchema } from "./DTO/DeleteTecnico.dto.js";
import { authenticateToken } from "../middlewares/auth.middleware.js";
import { authorizeRoles } from "../middlewares/role.middleware.js";
import blockEndpoint from "../middlewares/block.middleware.js";

/**
 * @openapi
 * /tecnicos:
 *   post:
 *     tags:
 *       - Técnicos
 *     summary: Registrar un nuevo técnico
 *     security:
 *       - cookieAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateTecnicoDto'
 *     responses:
 *       201:
 *         description: Técnico registrado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: '#/components/schemas/ApiResponseSucces'
 *                 - type: object
 *                   properties:
 *                     data:
 *                       $ref: '#/components/schemas/TecnicoOutDto'
 *       400:
 *         $ref: '#/components/responses/InvalidDataResponse'
 *       401:
 *         $ref: '#/components/responses/UnauthorizedResponse'
 *       403:
 *         $ref: '#/components/responses/ForbiddenResponse'
 * 
 *   get:
 *     tags:
 *       - Técnicos
 *     summary: Obtener el listado completo de técnicos
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: Listado de técnicos obtenido exitosamente
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
 *                         $ref: '#/components/schemas/TecnicoOutDto'
 *       401:
 *         $ref: '#/components/responses/UnauthorizedResponse'
 *       403:
 *         $ref: '#/components/responses/ForbiddenResponse'
 *       405:
 *         $ref: '#/components/responses/BlockedEndpointResponse'
 */

tecnicorouter.post("/tecnicos",authenticateToken,authorizeRoles('admin'),ValidationMiddleware(createTecnicoSchema), tecnicocontroller.createTecnico);
tecnicorouter.get("/tecnicos",blockEndpoint, tecnicocontroller.findAll);

/**
 * @openapi
 * /tecnicos/{dni}:
 *   put:
 *     tags:
 *       - Técnicos
 *     summary: Modificar datos de un técnico por DNI
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: dni
 *         required: true
 *         schema:
 *           type: string
 *           example: "40123456"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ModifyTecnicoDto'
 *     responses:
 *       200:
 *         description: Técnico actualizado correctamente
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: '#/components/schemas/ApiResponseSucces'
 *                 - type: object
 *                   properties:
 *                     data:
 *                       $ref: '#/components/schemas/TecnicoOutDto'
 *       400:
 *         $ref: '#/components/responses/InvalidDataResponse'
 *       401:
 *         $ref: '#/components/responses/UnauthorizedResponse'
 *       404:
 *         $ref: '#/components/responses/NotFoundResponse'
 * 
 *   delete:
 *     tags:
 *       - Técnicos
 *     summary: Eliminar un técnico por DNI
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: dni
 *         required: true
 *         schema:
 *           type: string
 *           example: "40123456"
 *     responses:
 *       200:
 *         description: Técnico eliminado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiResponseSucces'
 *       401:
 *         $ref: '#/components/responses/UnauthorizedResponse'
 *       404:
 *         $ref: '#/components/responses/NotFoundResponse'
 */

tecnicorouter.put("/tecnicos/:dni",authenticateToken,authorizeRoles('admin'),ValidationMiddleware(ModifyTecnicoSchema) ,tecnicocontroller.updateTecnico);
tecnicorouter.delete("/tecnicos/:dni",authenticateToken,authorizeRoles('admin'),ValidationMiddleware(DeleteTecnicoSchema), tecnicocontroller.deleteTecnico);
