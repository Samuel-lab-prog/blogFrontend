import { useQuery } from '@tanstack/react-query';
import { fetchHttp } from '@features/base';
import type { FullPostType } from '@features/posts';

export function usePost(slug?: string) {
  return useQuery({
    queryKey: ['posts', slug],
    queryFn: () => fetchHttp<FullPostType>({ path: `/posts/${slug}` }),
    enabled: !!slug,
  });
}
