import { Card, Flex, chakra, Text } from "@chakra-ui/react"
import { formatDate } from "@utils/functions";
import { NavigationLink } from "@components/NavigationLink/component";
import { Tag } from "@components/Tag/component";
import type { PostPreview } from '@types';
interface Props {
  post: PostPreview;
}
const ChakraCard = chakra(Card.Root);

export function PostCard({ post }: Props) {
  return (
    <ChakraCard bg='gray.100' variant='outline'>
      <Card.Title as="h3" textStyle='h4' px={4} pt={4} >{post.title}</Card.Title>
      <Card.Description textStyle='description' px={4} color='gray.600'>
        {post.excerpt}
      </Card.Description>
      <Card.Body py={0} px={4}>
        <Flex gap={2} flexWrap="wrap" mt={2}>
          {post.tags.map((tag) => (
            <Tag key={tag.id}>{tag.name}</Tag>
          ))}
        </Flex>
        <Text mt={2} fontSize='xs' color='gray.500'>
          Criado em {formatDate(post.createdAt)}
        </Text>
      </Card.Body>
      <Card.Footer justifyContent='end'>
        <NavigationLink to={`/posts/${post.slug}`} variant='outline'>Ler mais</NavigationLink>
      </Card.Footer>
    </ChakraCard>
  );
};
