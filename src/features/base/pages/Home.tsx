import { Flex, Heading, Text } from '@chakra-ui/react';
import { PostCard, PostGrid, useRecentPosts } from '@features/posts';
import { AsyncState } from '@features/base';

export function HomePage() {
  const { posts, isError, isLoading } = useRecentPosts({ limit: 4 });
  return (
    <>
      <Flex as="section" direction="column" w="full" gap={2} pb={4}>
        <Heading as="h1" textStyle="h1">
          Bem-vindo(a) ao Blog SG
        </Heading>
        <Text textStyle="body">
          Neste blog, você encontrará muitas citações interessantes de
          um indivíduo chamado Samuel Gomes.
        </Text>
      </Flex>
      <Flex as="section" direction="column" w="full" py={4}>
        <Heading as="h2" textStyle="h3" mb={2}>
          Últimas Publicações
        </Heading>
        <PostGrid>
          <AsyncState
            isLoading={isLoading}
            isError={isError}
            isEmpty={!posts || posts?.length === 0}
          >
            {posts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </AsyncState>
        </PostGrid>
      </Flex>
    </>
  );
}
