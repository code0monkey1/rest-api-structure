// validationSchemas.ts
import { z } from 'zod';

export const /* `registerSchema` is a validation schema defined using the `zod` library in TypeScript.
It defines the structure and validation rules for the data expected during user
registration. */
  registerSchema = z
    .object({
      username: z.string().min(3).max(20),
      email: z.string().email(),
      password: z.string().min(6),
      repeat_password: z.string().min(6),
    })
    .refine((data) => data.password === data.repeat_password, {
      message: "Passwords don't match",
      path: ['repeat_password'], // path of error
    });

registerSchema.refine((obj) => obj.password != obj.repeat_password);
