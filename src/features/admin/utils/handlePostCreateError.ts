import type { AppError } from '@features/base';
import type { UseFormSetError } from 'react-hook-form';
import type { CreatePostType } from '@features/admin';

export function handlePostError(
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
