import { useParams } from 'react-router-dom';
import { Box } from '@chakra-ui/react';

import {
  AsyncState,
  NavigationLink,
  MarkdownRenderer,
} from '@features/base';
import { usePost, PostHeader } from '@features/posts';

export function PostPage() {
  const { slug } = useParams<{ slug: string }>();
  const { data: post, isError, isLoading } = usePost(slug);

  return (
    <>
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
    </>
  );
}
