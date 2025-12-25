import { useState } from 'react';
import { Flex, Heading, Button, ButtonGroup } from '@chakra-ui/react';
import {
	CreatePostForm,
	DeletePostForm,
	UpdatePostForm,
} from '@features/admin';

type ActiveForm = 'create' | 'update' | 'delete';

export function AdminPage() {
	const [activeForm, setActiveForm] = useState<ActiveForm>('create');

	return (
		<Flex
			as='main'
			layerStyle='main'
			direction='column'
			gap={8}
		>
			<Flex
				as='section'
				direction='column'
				align='center'
				justify='center'
				w='full'
			>
				<Heading
					as='h1'
					textStyle='h1'
					mb={6}
				>
					Admin Dashboard
				</Heading>
				<ButtonGroup
					gap={2}
					mb={8}
					variant='surface'
				>
					<Button onClick={() => setActiveForm('create')}>Criar Post</Button>
					<Button onClick={() => setActiveForm('update')}>
						Atualizar Post
					</Button>
					<Button onClick={() => setActiveForm('delete')}>Deletar Post</Button>
				</ButtonGroup>
			</Flex>
			<Flex
				as='section'
				direction='column'
				align='center'
				justify='center'
				w='full'
			>
				<Flex
					direction='column'
					w='full'
					maxW='4xl'
				>
					{activeForm === 'create' && (
						<>
							<Heading
								as='h2'
								textStyle='h2'
								mb={4}
							>
								Criar Post
							</Heading>
							<CreatePostForm />
						</>
					)}

					{activeForm === 'update' && (
						<>
							<Heading
								as='h2'
								textStyle='h2'
								mb={4}
							>
								Atualizar Post
							</Heading>
							<UpdatePostForm />
						</>
					)}

					{activeForm === 'delete' && (
						<>
							<Heading
								as='h2'
								textStyle='h2'
								mb={4}
							>
								Deletar Post
							</Heading>
							<DeletePostForm />
						</>
					)}
				</Flex>
			</Flex>
		</Flex>
	);
}
