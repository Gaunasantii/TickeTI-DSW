/**
 * @openapi
 *  components:
 *    responses:
 *      ForbiddenResponse:
 *        description: Forbidden access
 *        content:
 *          application/json:
 *            schema:
 *              allOf:
 *                - $ref: '#/components/schemas/ApiResponseError'
 *                - type: object
 *                  properties:
 *                    message:
 *                      type: string
 *                      example: No tienes permiso para acceder a este recurso
 *                    data:
 *                      type: "null"
 *                      example: null
 */