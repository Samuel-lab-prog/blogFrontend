import { useEffect } from "react";
import { useParams } from "react-router-dom";
import useGet from "../../../hooks/useGet";
import { formatDate } from "../utils";
import { type FullPost } from "../../../types";
import Anchor from "../../../components/Anchor";
import Tag from "../components/Tag";

export default function PostPage() {
  const { slug } = useParams<{ slug: string }>();
  const { data: post, loading, error, get } = useGet<FullPost>(`/posts/${slug}`, { cache: true });

  useEffect(() => {
    get();
  }, [get]);

  if (loading) return <p className="text-center py-8">Carregando...</p>;
  if (error) return <p className="text-center py-8 text-red-600">Erro ao carregar a publicação. Tente novamente mais tarde.</p>;
  if (!post) return <p className="text-center py-8">Publicação não encontrada.</p>;

  return (
    <main className="flex justify-center px-4 lg:px-16 py-16 xl:py-24">
      <section className="max-w-4xl w-full flex flex-col gap-6">
        <h2>{post.title}</h2>
        <div className="flex flex-wrap gap-2">
          {post.tags.map(tag => (
            <Tag
              key={tag.id}
              name={tag.name}
            />
          ))}
        </div>
        <div className="flex flex-col gap-1 ">
          <p>Criado em: {formatDate(post.createdAt)}</p>
          <p>Última atualização: {formatDate(post.updatedAt)}</p>
        </div>
        <article className="prose max-w-full">
          <div className="text-justify" dangerouslySetInnerHTML={{ __html: post.content }} />
        </article>
        <div className="pt-4">
          <Anchor to="/">← Voltar para publicações</Anchor>
        </div>
      </section>
    </main>
  );
}
