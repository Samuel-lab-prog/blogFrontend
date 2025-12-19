import Card from '../../../components/Card';
import Tag from '../components/Tag';
import Anchor from '../../../components/Anchor';
import type { PostPreview } from '../../../types';
import { formatDate } from '../utils';

type PostCardProps = {
  post: PostPreview;
};

export function PostCard({ post }: PostCardProps) {
  return (
    <Card className="gap-y-2" variant="outlined">
      <Card.Title>{post.title}</Card.Title>

      <Card.Description className="font-medium opacity-80 text-sm">
        {post.excerpt}
      </Card.Description>

      <Card.Content className="flex flex-col gap-2">
        <div className="flex gap-x-2">
          {post.tags.map((tag) => (
            <Tag key={tag.id} name={tag.name} />
          ))}
        </div>
        <p className="text-sm opacity-70">
          Criado em {formatDate(post.createdAt)}
        </p>
      </Card.Content>

      <Card.Footer className="flex justify-end items-end h-full">
        <Anchor
          to={`/posts/${post.slug}`}
          className="h-fit"
          variant="btn-primary"
        >
          Ler mais
        </Anchor>
      </Card.Footer>
    </Card>
  );
}

export function PostCardSkeleton() {
  return (
    <div className="border rounded-xl p-4 animate-pulse space-y-3">
      <div className="h-40 bg-gray-200 rounded-lg" />
      <div className="h-4 bg-gray-200 rounded w-3/4" />
      <div className="h-3 bg-gray-200 rounded w-full" />
      <div className="h-3 bg-gray-200 rounded w-5/6" />
    </div>
  );
}
