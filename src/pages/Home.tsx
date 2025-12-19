import type { PaginatedPosts } from '../types';
import { useQuery } from '@tanstack/react-query';
import fetchHttp from '../utils/CreateQueryFunction';
import AsyncState from '../utils/AsyncState';
import { PostCard } from '../features/posts/components/PostCard';

export default function Home() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['posts'],
    queryFn: () =>
      fetchHttp<PaginatedPosts>({
        path: '/posts',
        params: { limit: 3 },
      }),
  });

  const posts = data?.items ?? [];

  return (
    <main className="flex flex-col mb-16">
      <section className="flex flex-col justify-end gap-2 pt-16 lg:pt-32 pb-8">
        <h2>Bem-vindo(a) ao Blog SA</h2>
        <p className="md:w-4/5">
          Neste blog, você encontrará muitas citações interessantes de
          um indivíduo chamado Samuel Gomes.
        </p>
      </section>

      <section className="flex flex-col px-4 lg:px-16 py-4">
        <h3 className="mb-2">Últimas Publicações</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          <AsyncState
            isLoading={isLoading}
            isError={isError}
            isEmpty={!isLoading && posts.length === 0}
          >
            {posts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </AsyncState>
        </div>
      </section>
    </main>
  );
}
