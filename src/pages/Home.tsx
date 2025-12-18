import { useEffect } from "react";
import useGet from "../hooks/useGet";
import { type PaginatedPosts } from "../types";
import Tag from "../features/posts/components/Tag";
import Card from "../components/Card";
import Anchor from "../components/Anchor";

export default function Home() {
  const { error, loading, data, get } = useGet<PaginatedPosts>('/posts', { cache: true });

  useEffect(() => {
    get({ limit: 1 });
  }, [get]);

  const allPosts = data?.items ?? [];
  const isEmpty = !loading && !error && allPosts.length === 0;

  return (
    <main className="flex flex-col">
      <section className="flex flex-col justify-end gap-2 h-50 lg:h-60 px-4 lg:px-16 pt-4 md:pb-4 lg:pb-8">
        <h2>Bem-vindo(a) ao Blog SA</h2>
        <p className="md:w-4/5">
          Neste blog, você encontrará muitas citações interessantes de um indivíduo chamado Samuel Gomes.
        </p>
      </section>

      <section className="flex flex-col px-4 lg:px-16 py-4">
        <h3 className="mb-2">Últimas Publicações</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {loading && <p>Carregando...</p>}
          {error && (
            <p className="text-red-600">
              Erro ao carregar publicações. Tente novamente mais tarde.
            </p>
          )}
          {isEmpty && <p>Nenhuma publicação disponível.</p>}

          {allPosts.map(post => (
            <Card key={post.id}>
              <Card.Header>
                <h4>{post.title}</h4>
              </Card.Header>
              <Card.Description className="font-medium opacity-80">
                {post.excerpt}
              </Card.Description>
              <Card.Content className="mt-4 flex gap-2 mb-1">
                {post.tags.map(tag => (
                  <Tag key={tag.id} name={tag.name} />
                ))}
              </Card.Content>
              <Card.Footer className="flex justify-end pt-4">
                <Anchor to={`/posts/${post.slug}`}>Ler mais</Anchor>
              </Card.Footer>
            </Card>
          ))}
        </div>
      </section>
    </main>
  );
}
