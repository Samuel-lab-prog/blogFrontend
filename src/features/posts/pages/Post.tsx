import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { formatDate } from '../utils';
import type { FullPost } from '../../../types';
import Anchor from '../../../components/Anchor';
import Tag from '../components/Tag';
import { fetchHttp } from '../../../utils/CreateQueryFunction';
import { AsyncState } from '../../../utils/AsyncState';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

export default function PostPage() {
  const { slug } = useParams<{ slug: string }>();

  const { data: post, error, isLoading } = useQuery({
    queryKey: ['post', slug],
    queryFn: () => fetchHttp<FullPost>({ path: `/posts/${slug}` }),
    enabled: !!slug,
  });

  if (!post && !isLoading) {
    return <p className="text-center py-8">Publicação não encontrada.</p>;
  }

  return (
    <main className="flex justify-center px-4 lg:px-16 py-16 xl:py-24">
      <section className="max-w-4xl w-full flex flex-col gap-6">
        <h2>{post?.title}</h2>
        <div className="flex flex-wrap gap-2">
          {post?.tags.map((tag) => (
            <Tag key={tag.id} name={tag.name} />
          ))}
        </div>
        <div className="flex flex-col gap-1">
          {post && (
            <>
              <p>Criado em: {formatDate(post.createdAt)}</p>
              <p>Última atualização: {formatDate(post.updatedAt)}</p>
            </>
          )}
        </div>
        <AsyncState isLoading={isLoading} isError={!!error} isEmpty={!post && !isLoading}>
          {post && (
            <article className="max-w-full text-justify prose whitespace-pre-wrap">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {post.content}
              </ReactMarkdown>
            </article>
          )}
        </AsyncState>
        <div className="pt-4">
          <Anchor to="/">← Voltar para publicações</Anchor>
        </div>
      </section>
    </main>
  );
}
