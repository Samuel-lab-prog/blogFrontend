import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import type { FullPost } from '../../../types';
import { formatDate } from '../utils';
import fetchHttp  from '../../../utils/CreateQueryFunction';
import AsyncState from '../../../utils/AsyncState';
import Anchor from '../../../components/Anchor';
import Tag from '../components/Tag';

export default function PostPage() {
  const { slug } = useParams<{ slug: string }>();

  const { data: post, error, isLoading } = useQuery({
    queryKey: ['post', slug],
    queryFn: () => fetchHttp<FullPost>({ path: `/posts/${slug}` }),
    enabled: !!slug,
  });

  return (
    <main className="flex flex-col items-center">
      <section className="max-w-4xl flex flex-col py-16 xl:py-24">
        <h2>{post?.title}</h2>
        <div className="flex mt-4 gap-2">
          {post?.tags.map((tag) => (
            <Tag key={tag.id} name={tag.name} />
          ))}
        </div>
        <div className="flex flex-col gap-1 mb-8 mt-2 text-xs md:text-sm">
          {post && (
            <>
              <i>Criado em {formatDate(post.createdAt)}</i>
              {post.updatedAt !== post.createdAt && (
              <i>Última atualização: {formatDate(post.updatedAt)}</i>
              )}
            </>
          )}
        </div>
        <AsyncState isLoading={isLoading} isError={!!error} isEmpty={!post && !isLoading}>
          {post && (
            <article className="max-w-full text-justify prose whitespace-pre-wrap">
              <ReactMarkdown >
                {post.content}
              </ReactMarkdown>
            </article>
          )}
        </AsyncState>
          <Anchor to  ="/posts" className='p-2 mt-8 w-fit'>← Voltar para publicações</Anchor>
      </section>
    </main>
  );
}
