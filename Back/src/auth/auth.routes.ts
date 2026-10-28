import { Router } from "express";
import { AuthController } from "./auth.controller.js";
import { ValidationMiddleware } from "../middlewares/validateInput.middleware.js";
import { LoginInSchema } from "./DTO/LoginIn.dto.js";

export const authRouter: Router = Router();

const authController = new AuthController();


/**
 * @openapi
 * /auth/login:
 *      post:
 *          tags:
 *            - Auth
 *          summary: Recibe las credenciales del usuario para inicio de sesion
 *          requestBody:
 *              required: true
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/LoginInput'
 *          responses:
 *              200:
 *                  description: El usuario ingreso correctamente
 *                  headers:
 *                      Set-Cookie:
 *                          description: Cookie HttpOnly que contiene el JWT
 *                          schema:
 *                              type: string
 *                              example: AccessToken=ABC1234; Path=/; HttpOnly
 *                  content:
 *                      application/json:
 *                          schema:
 *                              allOf:
 *                                  - $ref: '#/components/schemas/ApiResponseSucces'
 *                                  - type: object
 *                                    properties:
 *                                      data:
 *                                        $ref: '#/components/schemas/LoginOut'
 *              401:
 *                  description: Credenciales incorrectas
 *                  content:
 *                      application/json:
 *                          schema:
 *                              allOf:
 *                                  - $ref: '#/components/schemas/ApiResponseError'
 *                                  - type: object
 *                                    properties:
 *                                      message:
 *                                        type: string
 *                                        example: Credenciales incorrectas
 *                                      data:
 *                                        type: "null"
 *                                        example: null
 *              400:
 *                  description: Datos invalidos o faltantes
 *                  content:
 *                      application/json:
 *                          schema:
 *                              allOf:
 *                                  - $ref: '#/components/schemas/ApiResponseError'
 *                                  - type: object
 *                                    properties:
 *                                      message:
 *                                        type: string
 *                                        example: Error en la solicitud
 *                                      data:
 *                                        type: "null"
 *                                        example: null
 *                                      errors:
 *                                        type: array
 *                                        items:
 *                                          $ref: '#/components/schemas/FieldError'
 * 
 * 
 * /auth/logout:
 *   post:
 *     summary: Cierra la sesión del usuario
 *     tags:
 *       - Auth
 *     responses:
 *       200:
 *         description: Logout exitoso
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
 */
authRouter.post("/login",ValidationMiddleware(LoginInSchema), authController.login);
authRouter.post("/logout",authController.logout);