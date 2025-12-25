import { useParams } from 'react-router-dom';
import { Box } from '@chakra-ui/react';

import { AsyncState, NavigationLink, MarkdownRenderer } from '@features/base';
import { usePost, PostHeader } from '@features/posts';

export function PostPage() {
	const { id } = useParams<{ id: string }>();
	const { data: post, isError, isLoading } = usePost(Number(id));

	return (
		<>
			<Box
				as='section'
				maxW='4xl'
				w='full'
			>
				<AsyncState
					isLoading={isLoading}
					isError={!!isError}
					isEmpty={!post}
					emptyElement={<Box textStyle='body'>Post não encontrado</Box>}
					errorElement={
						<Box textStyle='body'>
							Erro ao carregar o post. Tente novamente mais tarde
						</Box>
					}
					loadingElement={<Box textStyle='body'>Carregando post...</Box>}
				>
					{post && (
						<>
							<PostHeader post={post} />
							<Box
								as='article'
								textAlign='justify'
								mt={50}
								whiteSpace='pre-wrap'
								wordBreak='break-word'
							>
								<MarkdownRenderer content={post.content} />
							</Box>
						</>
					)}
				</AsyncState>
				<Box
					mt={8}
					w='fit'
				>
					<NavigationLink to='/'>← Início</NavigationLink>
				</Box>
			</Box>
		</>
	);
}
