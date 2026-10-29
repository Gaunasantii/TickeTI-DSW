/**
 * @openapi
 * components:
 *   responses:
 *     InvalidDataResponse:
 *       description: Datos inválidos
 *       content:
 *         application/json:
 *           schema:
 *             allOf:
 *               - $ref: '#/components/schemas/ApiResponseError'
 *               - type: object
 *                 properties:
 *                   errors:
 *                     type: array
 *                     items:
 *                       $ref: '#/components/schemas/FieldError'
 */