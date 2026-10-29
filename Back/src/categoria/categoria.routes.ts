import { Router } from "express";
export const categoriarouter:Router = Router();
import { Categoriacontroller } from "./categoria.controller.js";
import { ValidationMiddleware } from "../middlewares/validateInput.middleware.js";
import { CreateCategoriaSchema } from "./DTO/CreateCategoria.dto.js";
import { ModifyCategoriaSchema } from "./DTO/ModifyCategoria.dto.js";
import { DeleteCategoriaSchema } from "./DTO/DeleteCategoria.dto.js";
import { PaginateCategoriaSchema } from "./DTO/PaginateCategoria.dto.js";
import { authenticateToken } from "../middlewares/auth.middleware.js";
import { authorizeRoles } from "../middlewares/role.middleware.js";

/**
 * @openapi
 * /categorias:
 *   post:
 *     tags:
 *      - Categorias
 *     summary: Crea una nueva categoria.
 *     security:
 *      - cookieAuth: []
 *     requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/CreateCategoriaDto'
 *     responses:
 *          201:
 *              description: La categoria se creo exitosamente
 *              content:
 *                  application/json:
 *                      schema:
 *                          allOf:
 *                              - $ref: '#/components/schemas/ApiResponseSucces'
 *                              - type: object
 *                                properties:
 *                                    data:
 *                                        type: "null"
 *                                        example: null
 *          400:
 *              $ref: '#/components/responses/InvalidDataResponse'
 * 
 *          401:
 *              $ref: '#/components/responses/UnauthorizedResponse'
 *          403:
 *              $ref: '#/components/responses/ForbiddenResponse'
 * 
 */
categoriarouter.post("/categorias",authenticateToken,authorizeRoles('admin'),ValidationMiddleware(CreateCategoriaSchema), Categoriacontroller.createCategoria);


/**
 * @openapi
 * /categorias:
 *   get:
 *    tags:
 *     - Categorias
 *    summary: Obtiene un listado de todas las categorias
 *    security:
 *      - cookieAuth: []
 *    responses:
 *      200:
 *          description: Se recuperaron exitosamente las categorias
 *          content:
 *              application/json:
 *                  schema:
 *                      allOf:
 *                          - $ref: '#/components/schemas/ApiResponseSucces'
 *                          - type: object
 *                            properties:
 *                              data:
 *                                  type: array
 *                                  items:
 *                                      $ref: '#/components/schemas/CategoriaOutDto'
 *      401:
 *          $ref: '#/components/responses/UnauthorizedResponse'
 *      403:
 *          $ref: '#/components/responses/ForbiddenResponse'
 * 
 */
categoriarouter.get("/categorias",authenticateToken, Categoriacontroller.findAll);


/**
 * @openapi
 * /categorias/{id}:
 *      put:
 *          tags:
 *           - Categorias
 *          summary: Modifica su categoria por su Id
 *          security:
 *           - cookieAuth: []
 *          parameters:
 *              - in:
 *                name: id
 *                required: true
 *                description: El Id de la categoria que voy a mdoficar
 *                schema:
 *                  type: integer
 *                  example: 1
 *          requestBody:
 *              required: true
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/ModifyCategoriaDto'
 *                              
 *          responses:
 *              200:
 *                  description: Categoria modificada exitosamente
 *                  content:
 *                      application/json:
 *                          schema:
 *                              allOf:
 *                                  - $ref: '#/components/schemas/ApiResponseSucces'
 *                                  - type: object
 *                                    properties:
 *                                      data:
 *                                          $ref: '#/components/schemas/CategoriaOutDto'
 *              404:
 *                  $ref: '#/components/responses/NotFoundResponse'
 *              401:
 *                  $ref: '#/components/responses/UnauthorizedResponse'
 *              403:
 *                  $ref: '#/components/responses/ForbiddenResponse'
 *              400:
 *                  $ref: '#/components/responses/InvalidDataResponse'
 * 
 */
categoriarouter.put("/categorias/:id",authenticateToken,ValidationMiddleware(ModifyCategoriaSchema), Categoriacontroller.updateCategoria);



/**
 * @openapi
 * /categorias/{id}:
 *      delete:
 *          tags:
 *           - Categorias
 *          summary: Elimina una categoria por su Id
 *          security:
 *           - cookieAuth: []
 *          parameters:
 *              - in:
 *                name: id
 *                required: true
 *                description: El Id de la categoria que voy a eliminar
 *                schema:
 *                  type: integer
 *          responses:
 *              200:
 *                  description: Categoria eliminada exitosamente
 *                  content:
 *                      application/json:
 *                          schema:
 *                              allOf:
 *                                  - $ref: '#/components/schemas/ApiResponseSucces'
 *                                  - type: object
 *                                    properties:
 *                                      data:
 *                                          type: "null"
 *                                          example: null
 *              401:
 *                  $ref: '#/components/responses/UnauthorizedResponse'
 *              403:
 *                  $ref: '#/components/responses/ForbiddenResponse'
 *              404:
 *                  $ref: '#/components/responses/NotFoundResponse'
 *              400:
 *                  $ref: '#/components/responses/InvalidDataResponse'
 */
categoriarouter.delete("/categorias/:id",authenticateToken,ValidationMiddleware(DeleteCategoriaSchema), Categoriacontroller.deleteCategoria);


/**
 * @openapi
 * /categorias/paginated:
 *      get:
 *          tags:
 *           - Categorias
 *          summary: Obtiene categorias paginadas
 *          security:
 *           - cookieAuth: []
 *          parameters:
 *              - in: query
 *                name: page
 *                required: true
 *                description: Número de página
 *                schema:
 *                  type: string
 *                  example: "1"
 *              - in: query
 *                name: cantPerPage
 *                required: true
 *                description: Cantidad de elementos por página
 *                schema:
 *                  type: string
 *                  example: "10"
 *          responses:
 *              200:
 *                  description: Lista de categorias paginadas
 *                  content:
 *                      application/json:
 *                          schema:
 *                              allOf:
 *                                  - $ref: '#/components/schemas/ApiResponsePagination'
 *                                  - type: object
 *                                    properties:
 *                                      data:
 *                                          type: array
 *                                          items:
 *                                              $ref: '#/components/schemas/CategoriaOutDto'
 *              401:
 *                  $ref: '#/components/responses/UnauthorizedResponse'
 *              403:
 *                  $ref: '#/components/responses/ForbiddenResponse'
 *              400:
 *                  $ref: '#/components/responses/InvalidDataResponse'
 */
categoriarouter.get("/categorias/paginated",authenticateToken,ValidationMiddleware(PaginateCategoriaSchema), Categoriacontroller.getCategoriasPaginated);

