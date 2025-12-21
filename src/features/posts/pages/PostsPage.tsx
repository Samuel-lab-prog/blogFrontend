import { AsyncState } from '@features/base';
import {
  useInfinitePosts,
  useTags,
  useFilters,
  PostCard,
  PostGrid,
} from '@features/posts';
import {
  Flex,
  Heading,
  Button,
  NativeSelect,
} from '@chakra-ui/react';

type OrderOption = 'newest' | 'oldest';

export function PostsPage() {
  const { tag, order, setTag, setOrder } = useFilters();

  /* ----------------------------- Queries ----------------------------- */

  const {
    posts,
    isError,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfinitePosts({ tag, order });

  const { tags } = useTags();

  /* ----------------------------- Options ----------------------------- */

  const tagOptions = [
    { value: '', label: 'Todas' },
    ...tags.map((t) => ({
      value: t.name,
      label: t.name,
    })),
  ];

  const orderOptions = [
    { value: 'newest', label: 'Mais recentes' },
    { value: 'oldest', label: 'Mais antigos' },
  ];

  /* ------------------------------ UI ------------------------------ */

  return (
    <>
      {/* ---------------------------- Filters ---------------------------- */}
      <Flex as="section" mb={6} gap={8} direction="column" w="full">
        <Heading as="h1" textStyle="h1">
          Todas as Publicações
        </Heading>
        <Flex
          direction={['column', undefined, 'row']}
          gap={[4, undefined, 8]}
          w="full"
        >
          <Flex direction="column" w="full">
            <Heading as="h3" textStyle="h3" mb={2}>
              Filtrar por tag
            </Heading>

            <NativeSelect.Root>
              <NativeSelect.Field
                value={tag ?? ''}
                onChange={(e) => setTag(e.target.value || undefined)}
              >
                {tagOptions.map((option) => (
                  <option
                    key={option.value}
                    value={option.value}
                    style={{ backgroundColor: 'white' }}
                  >
                    {option.label}
                  </option>
                ))}
              </NativeSelect.Field>
            </NativeSelect.Root>
          </Flex>

          <Flex direction="column" w="full">
            <Heading as="h3" textStyle="h3" mb={2}>
              Ordenar por
            </Heading>

            <NativeSelect.Root>
              <NativeSelect.Field
                value={order}
                onChange={(e) =>
                  setOrder(e.target.value as OrderOption)
                }
              >
                {orderOptions.map((option) => (
                  <option
                    key={option.value}
                    value={option.value}
                    style={{ backgroundColor: 'white' }}
                  >
                    {option.label}
                  </option>
                ))}
              </NativeSelect.Field>
            </NativeSelect.Root>
          </Flex>
        </Flex>
      </Flex>

      {/* ----------------------------- Posts ----------------------------- */}
      <Flex as="section" w="full" direction="column" gap={4}>
        <AsyncState
          isError={isError}
          isEmpty={!posts.length && !isLoading}
        >
          <PostGrid>
            {posts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </PostGrid>
        </AsyncState>
      </Flex>

      {/* ------------------------- Load More ------------------------- */}
      {hasNextPage && (
        <Button
          onClick={() => fetchNextPage()}
          disabled={!hasNextPage}
          loading={isFetchingNextPage}
          mt={8}
          alignSelf="center"
          variant="surface"
        >
          {isFetchingNextPage ? 'Carregando...' : 'Carregar mais'}
        </Button>
      )}
    </>
  );
}
