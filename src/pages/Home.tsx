import type { PaginatedPosts } from '../types';
import { useQuery } from '@tanstack/react-query';
import fetchHttp from '../utils/CreateQueryFunction';
import { PostCard } from '@components/PostCard/component';
import { Flex, Heading, Text, Grid } from '@chakra-ui/react';

export default function Home() {
  const { data } = useQuery({
    queryKey: ['posts'],
    queryFn: () =>
      fetchHttp<PaginatedPosts>({
        path: '/posts',
        params: { limit: 2 },
      }),
  });
  const posts = data?.items ?? [];

  return (
    <Flex as="main" direction="column" px={['4', undefined, undefined, '16']}>
      <Flex as="section" direction="column" gap={2} pt={16} pb={4}>
        <Heading as="h1" textStyle='h2'>Bem-vindo(a) ao Blog SA</Heading>
        <Text textStyle='body' >
          Neste blog, você encontrará muitas citações interessantes de
          um indivíduo chamado Samuel Gomes.
        </Text>
      </Flex>
      <Flex as="section" direction="column" py={4}>
        <Heading as="h2" textStyle='h3' mb={2}> Últimas Publicações</Heading>
        <Grid
          as='div' templateColumns={['1fr', undefined, '1fr 1fr']}
          gap={[2, undefined, undefined, undefined, 4]}>
          {posts.map((post) => (
            <PostCard post={post} />
          ))}
        </Grid>
      </Flex>
    </Flex>
  );
}
