/**
 * @openapi
 * components:
 *   responses:
 *     BlockedEndpointResponse:
 *       description: Acceso denegado. Este endpoint ha sido anulado por motivos de obsolescencia.
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               status:
 *                 type: string
 *                 example: "Forbidden"
 *               message:
 *                 type: string
 *                 example: "Acceso denegado. Este endpoint ha sido anulado por motivos de obsolescencia."
 */