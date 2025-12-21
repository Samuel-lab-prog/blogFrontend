import { useMutation } from '@tanstack/react-query';
import { fetchHttp } from '@features/base';
import type { CreatePostType } from '@features/admin';

export function useCreatePost() {
  return useMutation({
    mutationFn: (newPost: CreatePostType) =>
      fetchHttp<{ id: number }>({
        path: '/posts',
        method: 'POST',
        credentials: 'include',
        body: newPost,
      }),
  });
}
