import { Router } from "express";
export const adminrouter:Router = Router();
import { admincontroller } from "./admin.controller.js";
import { ValidationMiddleware } from "../middlewares/validateInput.middleware.js";
import { createAdminSchema } from "./DTO/CreateAdmin.dto.js";
import { ModifyAdminSchema } from "./DTO/ModifyAdmin.dto.js";
import { DeleteAdminSchema } from "./DTO/AdminDelete.dto.js";
import { authenticateToken } from "../middlewares/auth.middleware.js";
import { authorizeRoles } from "../middlewares/role.middleware.js";

/**
 * @openapi
 * /admins:
 *   post:
 *     tags:
 *       - Administradores
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
 * 
 *   get:
 *     tags:
 *       - Administradores
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
 */

adminrouter.post("/admins",authenticateToken,authorizeRoles('S_ADMIN'), ValidationMiddleware(createAdminSchema),admincontroller.createAdmin);
adminrouter.get("/admins",authenticateToken,admincontroller.findAll);

/**
 * @openapi
 * /admins/{dni}:
 *   get:
 *     tags:
 *       - Administradores
 *     summary: Obtener los datos de un administrador por DNI
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
 *         description: Administrador encontrado
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: '#/components/schemas/ApiResponseSucces'
 *                 - type: object
 *                   properties:
 *                     data:
 *                       $ref: '#/components/schemas/AdminOutDto'
 *       401:
 *         $ref: '#/components/responses/UnauthorizedResponse'
 *       404:
 *         $ref: '#/components/responses/NotFoundResponse'
 * 
 *   put:
 *     tags:
 *       - Administradores
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
 *       404:
 *         $ref: '#/components/responses/NotFoundResponse'
 * 
 *   delete:
 *     tags:
 *       - Administradores
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
 */

adminrouter.put("/admins/:dni",authenticateToken,ValidationMiddleware(ModifyAdminSchema), admincontroller.updateAdmin);
adminrouter.delete("/admins/:dni",authenticateToken,ValidationMiddleware(DeleteAdminSchema), admincontroller.deleteAdmin);
