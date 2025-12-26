import { useQuery } from '@tanstack/react-query';
import { fetchHttp, type AppErrorType } from '@features/base';

export function useAuth() {
	return useQuery({
		queryKey: ['auth'],
		queryFn: async () => {
			try {
				await fetchHttp<{ id: number }>({
					path: '/auth',
					method: 'POST',
				});
				return true;
			} catch (err) {
				const error = err as AppErrorType;
				if (error.statusCode !== 200) {
					return false;
				}
				throw err;
			}
		},
		staleTime: 1000 * 60 * 5,
		retry: false,
	});
}
