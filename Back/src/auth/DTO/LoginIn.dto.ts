import zod from 'zod'

/**
 * @openapi
 * components:
 *      schemas:
 *          LoginInput:
 *              type: object
 *              required:
 *                  - pass
 *                  - email
 *              properties:
 *                  email:
 *                      type: string
 *                      description: Es el email del usuario que ingresara
 *                      example: "user@example.com"
 *                  pass:
 *                      type: string
 *                      description: Es la contrasena del usuario que ingresara
 *                      example: "password123"
 */

export const LoginInSchema=zod.object({
    body:zod.object({
        pass:zod.string(),
        email:zod.email()
    })
})

export type LoginInDto=zod.infer<typeof LoginInSchema>["body"]