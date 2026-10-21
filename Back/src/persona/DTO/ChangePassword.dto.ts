import zod from "zod";

export const ChangePasswordSchema = zod.object ({
    body: zod.object({
        passwordActual: zod.string().min(1, "La contraseña actual es obligatoria"),
        passwordNueva: zod.string().min(8, "La nueva contraseña debe tener al menos 8 caracteres "),
    })
});

export type ChangePasswordBodyDTO = zod.infer <typeof ChangePasswordSchema>["body"];