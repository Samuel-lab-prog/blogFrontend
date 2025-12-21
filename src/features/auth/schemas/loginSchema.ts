import { z } from 'zod';

// No validation rules to difficult bruteforce attacks
export const loginSchema = z.object({
  email: z.string(),
  password: z.string()
});

export type LoginDataType = z.infer<typeof loginSchema>;
