import { Flex, Heading, Text, Box } from '@chakra-ui/react';
import { NavigationLink } from '@features/base';

export function ErrorPage() {
  return (
    <Flex
      minH="100vh"
      align="center"
      justify="center"
      px={6}
      py={20}
      textAlign="center"
    >
      <Box maxW="md">
        <Heading as="h1" size="xl" color="gray.800">
          Oops!
        </Heading>

        <Text fontSize="lg" color="gray.600" mt={3}>
          Something went wrong — or this page doesn’t exist.
        </Text>

        <Text fontSize="sm" color="gray.500" mt={1}>
          Try returning to the homepage or checking the URL.
        </Text>

        <Box mt={6}>
          <NavigationLink to="/">Go back home</NavigationLink>
        </Box>
      </Box>
    </Flex>
  );
}
