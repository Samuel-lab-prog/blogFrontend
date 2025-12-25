import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import type { AppError } from '@features/base';
import type { UseFormSetError } from 'react-hook-form';
import {
  createPostSchema,
  type CreatePostType,
} from '@features/admin';
import { useMutation } from '@tanstack/react-query';
import { fetchHttp } from '@features/base';

export function useCreatePostForm() {
  const [generalError, setGeneralError] = useState('');

  const form = useForm<CreatePostType>({
    resolver: zodResolver(createPostSchema),
    mode: 'onChange',
  });

  const { mutateAsync, isPending } = useCreatePost();

  async function onSubmit(data: CreatePostType) {
    const modifiedData = {
      ...data,
      tags: data.tags
        ?.split(',')
        .map((tag) => tag.trim())
        .filter(Boolean),
    };
    try {
      await mutateAsync(modifiedData);
      alert('Post criado com sucesso!');
    } catch (err) {
      handleCreatePostError(err, form.setError, setGeneralError);
    }
  }

  return {
    ...form,
    onSubmit,
    isPending,
    generalError,
  };
}

function handleCreatePostError(
  err: unknown,
  setError: UseFormSetError<CreatePostType>,
  setGeneralError: (msg: string) => void
) {
  const error = err as AppError;
  const status = error?.statusCode;
  const message = error?.errorMessages?.join(' ');

  if (status === 401) {
    setGeneralError('Você não tem permissão para criar posts.');
    return;
  }

  if (status === 409 && message?.includes('slug')) {
    setError('title', {
      type: 'manual',
      message: 'Já existe um post com esse título.',
    });
    return;
  }

  if (status === 422) {
    setGeneralError(
      'Dados inválidos. Verifique os campos e tente novamente.'
    );
    return;
  }

  setGeneralError(
    message || 'Erro ao criar post. Tente novamente mais tarde.'
  );
}

type FinalCreatePostType = {
  title: string;
  excerpt: string;
  content: string;
  tags?: string[];
  status?: 'draft' | 'published';
};

function useCreatePost() {
  return useMutation({
    mutationFn: (newPost: FinalCreatePostType) =>
      fetchHttp<{ id: number }, FinalCreatePostType>({
        path: '/posts',
        method: 'POST',
        credentials: 'include',
        body: newPost,
      }),
  });
}
