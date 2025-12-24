import { useQuery } from '@tanstack/react-query';
import { fetchHttp } from '@features/base';
import type { PaginatedPostsType } from '@features/posts';

type UseRecentPostsOptions = {
  limit?: number;
};

export function useRecentPosts({
  limit = 4,
}: UseRecentPostsOptions = {}) {
  const query = useQuery({
    queryKey: ['posts', 'recent', limit],
    queryFn: () =>
      fetchHttp<PaginatedPostsType>({
        path: '/posts',
        query: { limit },
      }),
  });

  return {
    posts: query.data?.posts ?? [],
    ...query,
  };
}
