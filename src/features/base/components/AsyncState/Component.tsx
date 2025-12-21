import { Text } from '@chakra-ui/react';

type AsyncStateProps = {
  isLoading?: boolean;
  isError?: boolean;
  isEmpty?: boolean;

  loadingMessage?: string;
  errorMessage?: string;
  emptyMessage?: string;

  children: React.ReactNode;
};

export function AsyncState({
  isLoading,
  isError,
  isEmpty,
  loadingMessage = 'Carregando...',
  errorMessage = 'Erro ao carregar dados. Tente novamente mais tarde.',
  emptyMessage = 'Nenhum dado disponível.',
  children,
}: AsyncStateProps) {
  if (isLoading) return <Text>{loadingMessage}</Text>;
  if (isError) return <Text>{errorMessage}</Text>;
  if (isEmpty) return <Text>{emptyMessage}</Text>;

  return <>{children}</>;
}
