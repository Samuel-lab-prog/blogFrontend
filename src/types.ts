export type FullPost = {
  tags: {
    name: string;
    id: number;
  }[];
  title: string;
  slug: string;
  excerpt: string;
  id: number;
  createdAt: Date;
  content: string;
  status: 'draft' | 'published';
  updatedAt: Date;
};

export type Tag = {
  id: number;
  name: string;
};

export type PostPreview = {
  tags: {
    name: string;
    id: number;
  }[];
  title: string;
  slug: string;
  excerpt: string;
  id: number;
  createdAt: Date;
};

export type AppError = {
  errorMessages: string[];
  statusCode: number;
};

export type PaginatedPosts = {
  nextCursor?: number | undefined;
  items: {
    status: 'published' | 'draft';
    id: number;
    tags: {
      name: string;
      id: number;
    }[];
    title: string;
    slug: string;
    excerpt: string;
    updatedAt: Date;
    createdAt: Date;
    content: string;
  }[];
  hasMore: boolean;
};
