import { useQuery } from '@tanstack/react-query';
import { fetchHttp } from '@features/base';
import type { TagType } from '@features/posts';

export function useTags() {
  const query = useQuery({
    queryKey: ['tags'],
    staleTime: 1000 * 60 * 30,
    retry: 3,
    queryFn: () =>
      fetchHttp<TagType[]>({
        path: '/posts/tags',
      }),
  });

  return {
    tags: query.data ?? [],
    isLoading: query.isLoading,
    isError: query.isError,
    error: query.error,
    refetch: query.refetch,
  };
}
