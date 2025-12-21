import { Flex, Heading, Text } from '@chakra-ui/react';
import { LoginForm } from '@features/auth';

export function Login() {
  return (
    <Flex as="main" direction="column" justify="center" h="80vh">
      <Flex as="section" px={4} direction="column" align="center">
        <Flex
          direction="column"
          align="center"
          mb={4}
          gap={2}
          textAlign="center"
        >
          <Heading as="h2" textStyle="h2">
            Entrar
          </Heading>

          <Text color="gray.600">
            Por favor, insira suas credenciais para entrar.
          </Text>
        </Flex>

        <LoginForm />
      </Flex>
    </Flex>
  );
}
