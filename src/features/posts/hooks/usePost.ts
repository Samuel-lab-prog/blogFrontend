import { useQuery } from '@tanstack/react-query';
import { fetchHttp } from '@features/base';
import type { FullPostType } from '@features/posts';

export function usePost(id: number) {
	const query = useQuery({
		queryKey: ['post', { id }],
		retry: 3,
		staleTime: 1000 * 60 * 30,
		queryFn: () => fetchHttp<FullPostType>({ path: '/posts', params: [id] }),
	});
	return {
		post: query.data,
		isLoading: query.isLoading,
		isError: query.isError,
		error: query.error,
		refetch: query.refetch,
	};
}
