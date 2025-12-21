import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';

import { fetchHttp, type AppErrorType } from '@features/base';
import { loginSchema, type LoginDataType } from '@features/auth';



export function useLoginForm() {
  const [generalError, setGeneralError] = useState('');
  const navigate = useNavigate();

  const form = useForm<LoginDataType>({
    resolver: zodResolver(loginSchema),
    mode: 'onChange',
  });

  const loginMutation = useMutation({
    mutationFn: (data: LoginDataType) =>
      fetchHttp<void>({
        path: '/auth/login',
        method: 'POST',
        credentials: 'include',
        body: data,
      }),

    onSuccess: () => {
      navigate('/admin');
    },

    onError: (err: unknown) => {
      const error = err as AppErrorType;

      if (error.statusCode === 401) {
        form.setError('email', {
          type: 'manual',
          message: 'Credenciais incorretas',
        });
        form.setError('password', {
          type: 'manual',
          message: 'Credenciais incorretas',
        });
        return;
      }

      if (error.statusCode === 429) {
        setGeneralError(
          'Muitas tentativas. Por favor, tente novamente mais tarde.'
        );
        return;
      }

      setGeneralError('Erro de rede, por favor tente novamente.');
    },
  });

  function onSubmit(data: LoginDataType) {
    setGeneralError('');
    loginMutation.mutate(data);
  }

  return {
    ...form,
    onSubmit,
    generalError,
    loading: loginMutation.isPending,
  };
}
