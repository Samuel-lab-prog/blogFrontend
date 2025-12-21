import {
  Card,
  Flex,
  Text,
  Skeleton,
  SkeletonText,
  Stack,
  HStack,
} from '@chakra-ui/react';

import { NavigationLink } from '@features/base';
import { formatDate } from '@features/base';

import { Tag, type PostPreviewType } from '@features/posts';

type PostCardProps = {
  post: PostPreviewType;
};

export function PostCard({ post }: PostCardProps) {
  return (
    <Card.Root bg="gray.100" p={4} h="full">
      <Card.Header p={0} mb={2}>
        <Card.Title as="h3" textStyle="h5">
          {post.title}
        </Card.Title>

        <Card.Description textStyle="sm" color="gray.600">
          {post.excerpt}
        </Card.Description>
      </Card.Header>

      <Card.Body p={0} flex="1" gap={2}>
        <Flex gap={2} flexWrap="wrap">
          {post.tags.map((tag) => (
            <Tag key={tag.id}>{tag.name}</Tag>
          ))}
        </Flex>

        <Text fontSize="xs" color="gray.500">
          Criado em {formatDate(post.createdAt)}
        </Text>
      </Card.Body>

      <Card.Footer p={0} justifyContent="flex-end" mt={3}>
        <NavigationLink to={`/posts/${post.slug}`} variant="outline">
          Ler mais
        </NavigationLink>
      </Card.Footer>
    </Card.Root>
  );
}

export function PostCardSkeleton() {
  return (
    <Card.Root bg="gray.100" p={4} h="full">
      <Stack gap={4} h="full" bg="gray.400">
        {/* Header */}
        <Stack gap={2}>
          <Skeleton height="20px" bg="white" />
          <SkeletonText noOfLines={2} />
        </Stack>

        {/* Tags */}
        <HStack gap={2} flexWrap="wrap">
          <Skeleton height="20px" width="60px" bg="gray.400" />
          <Skeleton height="20px" width="80px" bg="gray.400" />
          <Skeleton height="20px" width="50px" bg="gray.400" />
        </HStack>

        {/* Date */}
        <Skeleton height="12px" width="120px" bg="gray.400" />

        {/* Footer (CTA) */}
        <HStack justify="flex-end" mt="auto">
          <Skeleton height="32px" width="80px" bg="gray.400" />
        </HStack>
      </Stack>
    </Card.Root>
  );
}
