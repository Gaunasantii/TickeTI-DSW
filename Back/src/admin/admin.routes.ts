import { Router } from "express";
export const adminrouter:Router = Router();
import { admincontroller } from "./admin.controller.js";
import { ValidationMiddleware } from "../middlewares/validateInput.middleware.js";
import { createAdminSchema } from "./DTO/CreateAdmin.dto.js";
import { ModifyAdminSchema } from "./DTO/ModifyAdmin.dto.js";
import { DeleteAdminSchema } from "./DTO/AdminDelete.dto.js";
import { authenticateToken } from "../middlewares/auth.middleware.js";
import { authorizeRoles } from "../middlewares/role.middleware.js";

import blockEndpoint from "../middlewares/block.middleware.js";
/**
 * @openapi
 * /admins:
 *   post:
 *     tags:
 *       - Administradores (Endpoints muertos)
 *     summary: Registrar un nuevo administrador
 *     security:
 *       - cookieAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateAdminDto'
 *     responses:
 *       201:
 *         description: Administrador registrado con éxito
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: '#/components/schemas/ApiResponseSucces'
 *                 - type: object
 *                   properties:
 *                     data:
 *                       $ref: '#/components/schemas/AdminOutDto'
 *       400:
 *         $ref: '#/components/responses/InvalidDataResponse'
 *       401:
 *         $ref: '#/components/responses/UnauthorizedResponse'
 *       403:
 *         $ref: '#/components/responses/ForbiddenResponse'
 *       405:
 *         $ref: '#/components/responses/BlockedEndpointResponse'
 * 
 *   get:
 *     tags:
 *       - Administradores (Endpoints muertos)
 *     summary: Obtener el listado completo de administradores
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: Listado de administradores obtenido correctamente
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
 *                         $ref: '#/components/schemas/AdminOutDto'
 *       401:
 *         $ref: '#/components/responses/UnauthorizedResponse'
 *       403:
 *         $ref: '#/components/responses/ForbiddenResponse'
 *       405:
 *         $ref: '#/components/responses/BlockedEndpointResponse'
 */

adminrouter.post("/admins", blockEndpoint, admincontroller.createAdmin);
adminrouter.get("/admins", blockEndpoint, admincontroller.findAll);

/**
 * @openapi
 * /admins/{dni}:
 *   put:
 *     tags:
 *       - Administradores (Endpoints muertos)
 *     summary: Modificar datos de un administrador por DNI
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: dni
 *         required: true
 *         schema:
 *           type: string
 *           example: "35123456"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ModifyAdminDto'
 *     responses:
 *       200:
 *         description: Administrador actualizado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: '#/components/schemas/ApiResponseSucces'
 *                 - type: object
 *                   properties:
 *                     data:
 *                       $ref: '#/components/schemas/AdminOutDto'
 *       400:
 *         $ref: '#/components/responses/InvalidDataResponse'
 *       401:
 *         $ref: '#/components/responses/UnauthorizedResponse'
 *       403:
 *         $ref: '#/components/responses/ForbiddenResponse'
 *       405:
 *         $ref: '#/components/responses/BlockedEndpointResponse'
 *       404:
 *         $ref: '#/components/responses/NotFoundResponse'
 * 
 *   delete:
 *     tags:
 *       - Administradores (Endpoints muertos)
 *     summary: Eliminar un administrador por DNI
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: dni
 *         required: true
 *         schema:
 *           type: string
 *           example: "35123456"
 *     responses:
 *       200:
 *         description: Administrador eliminado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiResponseSucces'
 *       401:
 *         $ref: '#/components/responses/UnauthorizedResponse'
 *       404:
 *         $ref: '#/components/responses/NotFoundResponse'
 *       405:
 *         $ref: '#/components/responses/BlockedEndpointResponse'
 */

adminrouter.put("/admins/:dni", blockEndpoint, ValidationMiddleware(ModifyAdminSchema), admincontroller.updateAdmin);
adminrouter.delete("/admins/:dni", blockEndpoint, ValidationMiddleware(DeleteAdminSchema), admincontroller.deleteAdmin);
