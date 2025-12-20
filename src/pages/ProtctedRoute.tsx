import { useState, useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import fetchHttp from '@utils/CreateQueryFunction';
import type { AppError } from '@types';

export default function ProtectedRoute() {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState<
    boolean | null
  >(null);

  const { mutateAsync: authenticate } = useMutation({
    mutationFn: () =>
      fetchHttp<void>({
        path: '/auth',
        method: 'POST',
        credentials: 'include',
      }),
  });

  useEffect(() => {
    async function authUser() {
      try {
        await authenticate();
        setIsAuthenticated(true);
      } catch (error: unknown) {
        const typedError = error as AppError;
        if (typedError.statusCode === 401) {
          navigate('/');
        }
        setIsAuthenticated(false);
      }
    }

    authUser();
  }, [authenticate, navigate]);

  if (isAuthenticated === null) {
    return <p>Carregando...</p>;
  }

  return isAuthenticated ? (
    <Outlet />
  ) : (
    <section className="flex flex-col items-center justify-center min-h-screen px-4">
      <h2 className="mb-4 text-2xl font-semibold">Boa tentativa!</h2>
    </section>
  );
}
