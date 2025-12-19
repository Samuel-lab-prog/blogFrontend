import type { PaginatedPosts, Tag } from "../../../types";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import fetchHttp from "../../../utils/CreateQueryFunction";
import AsyncState from "../../../utils/AsyncState";
import { PostCard, PostCardSkeleton } from "../components/PostCard";
import Button from "../../../components/Button";
import Select from "../../../components/Select";
import { useSearchParams } from "react-router-dom";

const POSTS_LIMIT = 6;
type OrderOption = "newest" | "oldest";

export default function Home() {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialTag = searchParams.get("tag") || undefined;

  const [cursor, setCursor] = useState<number | undefined>(undefined);
  const [prevCursorStack, setPrevCursorStack] = useState<number[]>([]);
  const [tag, setTag] = useState<string | undefined>(initialTag);
  const [order, setOrder] = useState<OrderOption>("newest");

  const {
    data,
    isLoading,
    isError,
    isFetching,
  } = useQuery({
    queryKey: ["posts", tag, order, cursor],
    staleTime: 1000 * 60 * 30,
    queryFn: () =>
      fetchHttp<PaginatedPosts>({
        path: "/posts",
        params: {
          limit: POSTS_LIMIT,
          cursor,
          tag,
          orderBy: "createdAt",
          orderDirection: order === "newest" ? "desc" : "asc",
        },
      }),
  });

  const { data: tags } = useQuery({
    queryKey: ["tags"],
    staleTime: Infinity,
    queryFn: () =>
      fetchHttp<Tag[]>({
        path: "/posts/tags",
        params: {
          deleted: "false",
          draft: "false",
        },
      }),
  });

  const posts = data?.items ?? [];

  function resetPagination() {
    setCursor(undefined);
    setPrevCursorStack([]);
  }

  function handleNext() {
    if (!data?.nextCursor) return;

    setPrevCursorStack((prev) =>
      cursor ? [...prev, cursor] : prev
    );
    setCursor(data.nextCursor);
  }

  function handlePrevious() {
    setPrevCursorStack((prev) => {
      const copy = [...prev];
      const last = copy.pop();
      setCursor(last);
      return copy;
    });
  }

  function handleChangeTag(newTag?: string) {
    resetPagination();
    setTag(newTag);

    setSearchParams((prev) => {
      if (newTag) prev.set("tag", newTag);
      else prev.delete("tag");
      return prev;
    });
  }

  function handleChangeOrder(value: OrderOption) {
    resetPagination();

    setSearchParams((prev) => {
      prev.set("order", value);
      return prev;
    });
    setOrder(value);
  }

  const tagOptions = [
    { value: "", label: "Todas" },
    ...(tags?.map((t) => ({
      value: t.name,
      label: t.name,
    })) ?? []),
  ];

  const orderOptions = [
    { value: "newest", label: "Mais recentes" },
    { value: "oldest", label: "Mais antigos" },
  ];

  return (
    <main className="flex flex-col mb-16">
      <section className="pt-16 pb-8">
        <div className="flex flex-col md:flex-row md:gap-8">
          <div className="max-w-xs w-full">
            <h3 className="mb-2">Filtrar por tag</h3>
            <Select
              name="tag"
              label="Selecionar tag"
              value={tag ?? ""}
              options={tagOptions}
              onChange={(e) =>
                handleChangeTag(e.target.value || undefined)
              }
            />
          </div>

          <div className="max-w-xs w-full">
            <h3 className="mb-2">Ordenar por</h3>
            <Select
              name="order"
              label="Ordenação"
              value={order}
              options={orderOptions}
              onChange={(e) =>
                handleChangeOrder(e.target.value as OrderOption)
              }
            />
          </div>
        </div>
      </section>

      <section>
        <AsyncState
          isError={isError}
          isEmpty={!posts.length && !isLoading}
        >
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {posts.length === 0 && isLoading
              ? Array.from({ length: POSTS_LIMIT }).map((_, i) => (
                  <PostCardSkeleton key={i} />
                ))
              : posts.map((post) => (
                  <PostCard key={post.id} post={post} />
                ))}
          </div>

          <div className="flex justify-center gap-4 mt-10">
            <Button
              onClick={handlePrevious}
              disabled={prevCursorStack.length === 0 || isFetching}
              variant="secondary"
            >
              Anterior
            </Button>
            <Button
              onClick={handleNext}
              disabled={isFetching || !data?.nextCursor}
              variant="secondary"
            >
              Próxima
            </Button>
          </div>
        </AsyncState>
      </section>
    </main>
  );
}
