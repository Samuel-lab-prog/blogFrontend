import { z } from 'zod';

export const createPostSchema = z.object({
  title: z
    .string()
    .min(5, 'O título deve ter pelo menos 3 caracteres'),
  excerpt: z
    .string()
    .min(10, 'O resumo deve ter pelo menos 10 caracteres'),
  content: z
    .string()
    .min(20, 'O conteúdo deve ter pelo menos 100 caracteres'),
  tags: z
    .array(z.string())
    .max(5, 'No máximo 5 tags são permitidas')
    .optional(),
  status: z.enum(['draft', 'published']),
});
export const deletePostSchema = z.object({
  id: z
    .number('ID inválido')
    .min(1, 'ID deve ser um numero positivo'),
});
export const updatePostSchema = createPostSchema.extend({
  id: z
    .number('ID inválido')
    .min(1, 'ID deve ser um numero positivo'),
});

export type CreatePostType = z.infer<typeof createPostSchema>;
export type DeletePostType = z.infer<typeof deletePostSchema>;
export type UpdatePostType = z.infer<typeof updatePostSchema>;
