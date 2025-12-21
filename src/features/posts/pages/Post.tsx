import { useParams } from 'react-router-dom';
import { Flex, Box } from '@chakra-ui/react';

import { AsyncState, NavigationLink, MarkdownRenderer } from '@features/base';
import { usePost, PostHeader } from '@features/posts';

export function Post() {
  const { slug } = useParams<{ slug: string }>();
  const { data: post, isError, isLoading } = usePost(slug);

  return (
    <Flex as="main" justify="center" layerStyle="main">
      <Box as="section" maxW="4xl" w="full">
        <AsyncState
          isLoading={isLoading}
          isError={!!isError}
          isEmpty={!post}
        >
          {post && (
            <>
              <PostHeader post={post} />
              <Box as="article" textAlign="justify" mt={50}>
                <MarkdownRenderer content={post.content} />
              </Box>
            </>
          )}
        </AsyncState>
        <Box mt={8} w="fit">
          <NavigationLink to="/">← Início</NavigationLink>
        </Box>
      </Box>
    </Flex>
  );
}
