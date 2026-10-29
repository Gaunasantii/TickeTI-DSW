/**
 * @openapi
 *  components:
 *    responses:
 *      NotFoundResponse:
 *        description: Resource not found
 *        content:
 *          application/json:
 *            schema:
 *              allOf:
 *                - $ref: '#/components/schemas/ApiResponseError'
 *                - type: object
 *                  properties:
 *                    message:
 *                      type: string
 *                      example: Recurso no encontrado
 *                    data:
 *                      type: "null"
 *                      example: null
 */