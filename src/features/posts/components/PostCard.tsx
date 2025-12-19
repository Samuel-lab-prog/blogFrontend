import Card from "../../../components/Card";
import Tag from "../components/Tag";
import Anchor from "../../../components/Anchor";
import type { PostPreview } from "../../../types";

type PostCardProps = {
  post: PostPreview;
};

export default function PostCard({ post }: PostCardProps) {
  return (
    <Card>
      <Card.Header>
        <h4>{post.title}</h4>
      </Card.Header>

      <Card.Description className="font-medium opacity-80">
        {post.excerpt}
      </Card.Description>

      <Card.Content className="mt-4 flex gap-2 mb-1">
        {post.tags.map((tag) => (
          <Tag key={tag.id} name={tag.name} />
        ))}
      </Card.Content>

      <Card.Footer className="flex justify-end pt-4">
        <Anchor to={`/posts/${post.slug}`}>
          Ler mais
        </Anchor>
      </Card.Footer>
    </Card>
  );
}