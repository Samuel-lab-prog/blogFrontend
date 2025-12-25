import { AsyncState } from '@features/base';
import { useInfinitePosts, useTags, PostCard, PostGrid } from '@features/posts';
import { Flex, Heading, Button } from '@chakra-ui/react';
import { SelectField } from '@features/base';
import { useSearchParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useEffect } from 'react';

type OrderOption = 'newest' | 'oldest';

export function PostsPage() {
	// Custom local hook to manage filters and sync with URL search params
	function useFilters() {
		const [searchParams, setSearchParams] = useSearchParams();

		const initialTag = searchParams.get('tag') || undefined;
		const initialOrder = (searchParams.get('order') as OrderOption) || 'newest';

		const form = useForm<{ tag?: string; order: OrderOption }>({
			defaultValues: {
				tag: initialTag,
				order: initialOrder,
			},
			mode: 'onChange',
		});

		const tag = form.watch('tag');
		const order = form.watch('order');

		useEffect(() => {
			const newParams = new URLSearchParams();
			if (tag) newParams.set('tag', tag);
			if (order) newParams.set('order', order);
			setSearchParams(newParams);
		}, [tag, order, setSearchParams]);

		return {
			control: form.control,
			tag,
			order,
		};
	}

	const { control, tag, order } = useFilters();
	const { tags, isLoading: isTagsLoading } = useTags();
	const {
		posts,
		isError,
		isLoading,
		fetchNextPage,
		hasNextPage,
		isFetchingNextPage,
	} = useInfinitePosts({ tag: tag || undefined, order });

	const tagOptions = [
		{ value: '', label: 'Todas' },
		...tags.map((t) => ({ value: t.name, label: t.name })),
	];

	const orderOptions: { value: OrderOption; label: string }[] = [
		{ value: 'newest', label: 'Mais recentes' },
		{ value: 'oldest', label: 'Mais antigos' },
	];

	return (
		<Flex
			as='main'
			layerStyle='main'
			direction='column'
		>
			<Flex
				as='section'
				mb={6}
				gap={8}
				direction='column'
				w='full'
			>
				<Heading
					as='h1'
					textStyle='h1'
				>
					Todas as Publicações
				</Heading>

				<Flex
					as='form'
					direction={['column', undefined, 'row']}
					gap={[4, undefined, 8]}
					w='full'
				>
					<SelectField
						label='Filtrar por tag'
						name='tag'
						disabled={isTagsLoading}
						control={control}
						options={tagOptions}
					/>

					<SelectField
						label='Ordenar por'
						name='order'
						control={control}
						options={orderOptions}
					/>
				</Flex>
			</Flex>

			<Flex
				as='section'
				w='full'
				direction='column'
				gap={4}
			>
				<AsyncState
					isError={isError}
					isEmpty={posts?.length === 0 && !isLoading}
					isLoading={isLoading}
					emptyElement={<Flex textStyle='body'>Nenhum post encontrado</Flex>}
					errorElement={<Flex textStyle='body'>Erro ao carregar posts</Flex>}
					loadingElement={<Flex textStyle='body'>Carregando posts...</Flex>}
				>
					<PostGrid>
						{posts.map((post) => (
							<PostCard
								key={post.id}
								post={post}
							/>
						))}
					</PostGrid>
				</AsyncState>
			</Flex>

			<Flex justify={['end', 'end', 'end', 'center']}>
				{hasNextPage && (
					<Button
						onClick={() => fetchNextPage()}
						disabled={!hasNextPage}
						loading={isFetchingNextPage}
						mt={8}
						loadingText='Carregando...'
						alignSelf='center'
						variant='surface'
					>
						{isFetchingNextPage ? 'Carregando...' : 'Carregar mais'}
					</Button>
				)}
			</Flex>
		</Flex>
	);
}
