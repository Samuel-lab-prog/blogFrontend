import { useQuery } from '@tanstack/react-query';
import { fetchHttp } from '@features/base';
import type { PaginatedPostsType } from '@features/posts';

type UseRecentPostsOptions = {
	limit?: number;
};

export function useRecentPosts({ limit = 4 }: UseRecentPostsOptions) {
  const query = useQuery({
    queryKey: ['posts-recent', { limit }],
    retry: 3,
    staleTime: 1000 * 60 * 30,
    queryFn: () =>
      fetchHttp<PaginatedPostsType>({
        path: '/posts',
        query: { limit, deleted: 'false', draft: 'false' },
      }),
  });

  return {
    posts: query.data?.posts ?? [],
    isLoading: query.isLoading,
    isError: query.isError,
    error: query.error,
    refetch: query.refetch,
  };
}
