// validationSchemas.ts
import { z } from 'zod';

const registrationSchema = z.object({
  username: z.string().min(3).max(20),
  email: z.string().email(),
  password: z.string().min(6),
});

export default { registrationSchema };
