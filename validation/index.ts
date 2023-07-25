// validationSchemas.ts
import { z } from 'zod';

export const registerSchema = z.object({
  username: z.string().min(3).max(20),
  email: z.string().email(),
  password: z.string().min(6),
  repeat_password: z.string().min(6),
});

registerSchema.refine((obj) => obj.password != obj.repeat_password);
