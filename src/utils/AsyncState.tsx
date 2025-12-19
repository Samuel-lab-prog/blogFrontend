type AsyncStateProps = {
  isLoading?: boolean;
  isError: boolean;
  isEmpty: boolean;

  loadingFallback?: React.ReactNode;
  errorFallback?: React.ReactNode;
  emptyFallback?: React.ReactNode;

  children: React.ReactNode;
};

export default function AsyncState({
  isLoading,
  isError,
  isEmpty,
  loadingFallback = <p>Carregando...</p>,
  errorFallback = (
    <p className="text-red-600">
      Erro ao carregar dados. Tente novamente mais tarde.
    </p>
  ),
  emptyFallback = <p>Nenhum dado disponível.</p>,
  children,
}: AsyncStateProps) {
  if (isLoading) return <>{loadingFallback}</>;
  if (isError) return <>{errorFallback}</>;
  if (isEmpty) return <>{emptyFallback}</>;

  return <>{children}</>;
}
