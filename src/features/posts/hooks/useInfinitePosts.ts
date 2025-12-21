import { useInfiniteQuery } from '@tanstack/react-query';
import { fetchHttp } from '@features/base';
import type { PaginatedPostsType } from '@features/posts';

const POSTS_LIMIT = 8;
type OrderOption = 'newest' | 'oldest';
type UsePostsInfiniteParams = {
  tag?: string;
  order: OrderOption;
};

export function useInfinitePosts({
  tag,
  order,
}: UsePostsInfiniteParams) {
  const query = useInfiniteQuery({
    queryKey: ['posts', tag, order],
    staleTime: 1000 * 60 * 30,
    initialPageParam: undefined as number | undefined,

    queryFn: ({ pageParam }) =>
      fetchHttp<PaginatedPostsType>({
        path: '/posts',
        params: {
          limit: POSTS_LIMIT,
          cursor: pageParam,
          tag,
          orderBy: 'createdAt',
          orderDirection: order === 'newest' ? 'desc' : 'asc',
        },
      }),

    getNextPageParam: (lastPage) => lastPage.nextCursor ?? undefined,
  });

  const posts = query.data?.pages.flatMap((page) => page.items) ?? [];

  return {
    ...query,
    posts,
  };
}
