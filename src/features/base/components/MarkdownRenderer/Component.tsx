import ReactMarkdown from 'react-markdown';
import type { Components } from 'react-markdown';
import { Heading, Text, Mark } from '@chakra-ui/react';

type MarkdownRendererProps = {
  content: string;
};

const components: Components = {
  h1: (p) => <Heading as="h1" textStyle="h1" my={4} {...p} />,
  h2: (p) => <Heading as="h2" textStyle="h2" my={6} {...p} />,
  h3: (p) => <Heading as="h3" textStyle="h3" my={4} {...p} />,
  h4: (p) => <Heading as="h4" textStyle="h4" my={4} {...p} />,
  h5: (p) => <Heading as="h5" textStyle="h5" my={4} {...p} />,
  h6: (p) => <Heading as="h6" textStyle="h6" my={4} {...p} />,

  p: (p) => <Text as="p" my={0} textStyle="body" {...p} />,

  strong: (p) => <Mark as="strong" fontWeight="bold" {...p} />,
  em: (p) => <Mark as="em" fontStyle="italic" {...p} />,

  ul: (p) => <Mark as="ul" pl={6} my={2} {...p} />,
  ol: (p) => <Mark as="ol" pl={6} my={2} {...p} />,
  li: (p) => <Mark as="li" mb={1} {...p} />,

  a: (p) => (
    <Mark as="a" color="blue.500" textDecoration="underline" {...p} />
  ),
};

export function MarkdownRenderer({ content }: MarkdownRendererProps) {
  if (!content) return null;

  return (
    <ReactMarkdown components={components}>{content}</ReactMarkdown>
  );
}
