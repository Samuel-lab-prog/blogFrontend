import { useQuery } from '@tanstack/react-query';
import { fetchHttp } from '@features/base';
import type { FullPostType } from '@features/posts';

export function usePost(id: number) {
	const query = useQuery({
		queryKey: ['post', id],
		queryFn: () => fetchHttp<FullPostType>({ path: '/posts', params: [id] }),
		enabled: !!id,
	});
	const post = query.data;
	return {
		...query,
		post,
	};
}
