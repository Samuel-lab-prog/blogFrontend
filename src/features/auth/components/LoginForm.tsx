import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { useNavigate } from 'react-router-dom';
import { zodResolver } from '@hookform/resolvers/zod';
import Input from '../../../components/Input';
import Button from '../../../components/Button';
import usePost from '../../../hooks/usePost';

const loginSchema = z.object({
  email: z.string().email('Endereço de e-mail inválido'),
  password: z.string().min(6, 'A senha deve ter pelo menos 6 caracteres'),
});

type LoginData = z.infer<typeof loginSchema>;

export default function LoginForm({ className = '' }: { className?: string }) {
  const [generalError, setGeneralError] = useState('');
  const { post, loading, error } = usePost<LoginData, void>('/auth/login', { credentials: true });
  const navigate = useNavigate();

  const {
    register,
    setError,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<LoginData>({
    resolver: zodResolver(loginSchema),
    mode: 'onChange',
  });

  const onSubmit = async (loginData: LoginData) => {
    setGeneralError('');

    try {
      post(loginData);

      if (!error) {
        navigate('/admin');
        return;
      }

      const code = error.statusCode;
      if (code === 401) {
        setError('password', { type: 'manual', message: 'Credenciais incorretas' });
        setError('email', { type: 'manual', message: 'Credenciais incorretas' });
      }
      if (code === 429) {
        setGeneralError('Muitas tentativas. Por favor, tente novamente mais tarde.');
      }
    } catch {
      setGeneralError('Erro de rede, por favor tente novamente.');
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={`w-full max-w-md flex flex-col gap-2 ${className}`}
    >
      {generalError && <p className="text-red-500 text-sm mb-2">{generalError}</p>}

      <Input
        label="E-mail"
        placeholder="Digite seu e-mail"
        error={errors.email?.message}
        {...register('email')}
      />

      <Input
        label="Senha"
        type="password"
        placeholder="Digite sua senha"
        error={errors.password?.message}
        {...register('password')}
      />

      <Button disabled={loading || !isValid} variant="primary" htmlType="submit">
        {loading ? 'Entrando...' : 'Entrar'}
      </Button>
    </form>
  );
}
