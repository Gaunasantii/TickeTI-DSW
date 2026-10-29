/**
 * @openapi
 *  components:
 *    responses:
 *      UnauthorizedResponse:
 *        description: Unauthorized access
 *        content:
 *          application/json:
 *            schema:
 *              allOf:
 *                - $ref: '#/components/schemas/ApiResponseError'
 *                - type: object
 *                  properties:
 *                    message:
 *                      type: string
 *                      example: Token de autenticación inválido o expirado
 *                    data:
 *                      type: "null"
 *                      example: null
 */