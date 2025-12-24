import { useQuery } from '@tanstack/react-query';
import { fetchHttp } from '@features/base';
import type { PaginatedMinimalPostsType } from '@features/posts';

type config = {
  deleted?: 'only' | 'exclude';
  status?: 'published' | 'draft';
};
export function usePostsMinimal(config: config) {
  const query = useQuery({
    queryKey: ['posts-minimal'],
    staleTime: 1000 * 60 * 5, // 5 minutes
    queryFn: () =>
      fetchHttp<PaginatedMinimalPostsType>({
        path: '/posts/minimal',
        credentials: 'include',
        query: { limit: 500, ...config },
      }),
  });

  const posts = query.data?.posts ?? [];

  return {
    ...query,
    posts,
  };
}
