import { useQuery } from '@tanstack/react-query';
import { fetchHttp } from '@features/base';
import type { TagType } from '@features/posts';

export function useTags() {
	const query = useQuery({
		queryKey: ['tags'],
		staleTime: Infinity,
		queryFn: () =>
			fetchHttp<TagType[]>({
				path: '/posts/tags',
				query: {
					deleted: 'false',
					draft: 'false',
				},
			}),
	});

	return {
		...query,
		tags: query.data ?? [],
	};
}
