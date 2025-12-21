import { z } from 'zod';

export const postSchema = z.object({
  title: z
    .string()
    .min(3, 'O título deve ter pelo menos 3 caracteres.'),
  excerpt: z
    .string()
    .min(10, 'O resumo deve ter pelo menos 10 caracteres.'),
  content: z
    .string()
    .min(100, 'O conteúdo deve ter pelo menos 100 caracteres.'),
  tags: z
    .array(
      z.string().min(2, 'Cada tag deve ter pelo menos 2 caracteres.')
    )
    .max(5, 'No máximo 5 tags são permitidas.')
    .optional(),
  status: z.enum(['draft', 'published']),
});

export type CreatePostType = z.infer<typeof postSchema>;
