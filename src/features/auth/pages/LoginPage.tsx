import { Flex, Heading, Text } from '@chakra-ui/react';
import { LoginForm } from '@features/auth';

export function LoginPage() {
	return (
		<>
			<Flex
				as='section'
				px={4}
				direction='column'
				align='center'
				justify='start'
				w='full'
				h='70vh'
			>
				<Flex
					direction='column'
					align='center'
					mb={4}
					gap={2}
					textAlign='center'
				>
					<Heading
						as='h2'
						textStyle='h2'
					>
						Entrar
					</Heading>

					<Text color='gray.600'>
						Por favor, insira suas credenciais para entrar.
					</Text>
				</Flex>

				<LoginForm />
			</Flex>
		</>
	);
}
