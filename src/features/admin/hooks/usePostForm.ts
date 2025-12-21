import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { postSchema, type CreatePostType } from '@features/admin';
import { useCreatePost } from './useCreatePost';
import { handlePostError } from '@root/features/admin/utils/handlePostCreateError';

export function usePostForm() {
  const [generalError, setGeneralError] = useState('');

  const form = useForm<CreatePostType>({
    resolver: zodResolver(postSchema),
    mode: 'onChange',
  });

  const { mutateAsync, isPending } = useCreatePost();

  async function onSubmit(data: CreatePostType) {
    try {
      await mutateAsync(data);
      alert('Post criado com sucesso!');
    } catch (err) {
      handlePostError(err, form.setError, setGeneralError);
    }
  }

  return {
    ...form,
    onSubmit,
    isPending,
    generalError,
  };
}
