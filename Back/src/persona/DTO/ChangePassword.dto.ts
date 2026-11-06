import zod from "zod";

/**
 * @openapi
 * components:
 *   schemas:
 *     ChangePasswordDto:
 *       type: object
 *       required:
 *         - dni
 *         - currentPassword
 *         - newPassword
 *       properties:
 *         dni:
 *           type: string
 *           example: "47107024"
 *         currentPassword:
 *           type: string
 *           format: password
 *           example: "PasswordActual123!"
 *         newPassword:
 *           type: string
 *           format: password
 *           example: "NuevaPassword456!"
 */

export const ChangePasswordSchema = zod.object ({
    body: zod.object({
        passwordActual: zod.string().min(1, "La contraseña actual es obligatoria"),
        passwordNueva: zod
            .string()
            .min(8, "La nueva contraseña debe tener al menos 8 caracteres ")
            .regex(/[A-Z]/, "Debe tener al menos una mayúscula")
            .regex(/[a-z]/, "Debe tener al menos una minuscula")
            .regex(/\d/, "Debe tener al menos un número")
            .regex(/[^A-Za-z0-9]/, "Debe tener al menos un símbolo"),
    })
});

export type ChangePasswordBodyDTO = zod.infer <typeof ChangePasswordSchema>["body"];