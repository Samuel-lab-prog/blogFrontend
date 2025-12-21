import { useState } from 'react';
import { Flex, Heading, Button, ButtonGroup } from '@chakra-ui/react';
import { CreatePostForm } from '@features/admin';

type ActiveForm = 'create' | 'update' | 'delete';

export function AdminPage() {
  const [activeForm, setActiveForm] = useState<ActiveForm>('create');

  return (
    <Flex as="main" direction="column" layerStyle="main">
      <Flex
        as="section"
        direction="column"
        align="center"
        justify="center"
      >
        <Heading as="h1" textStyle="h1" mb={6}>
          Admin Dashboard
        </Heading>
        <ButtonGroup variant="surface" gap={2} mb={8}>
          <Button onClick={() => setActiveForm('create')}>
            Criar Post
          </Button>
          <Button onClick={() => setActiveForm('update')}>
            Atualizar Post
          </Button>
          <Button onClick={() => setActiveForm('delete')}>
            Deletar Post
          </Button>
        </ButtonGroup>
      </Flex>
      <Flex as="section" direction="column" align="center">
        <Flex direction="column" w="full" maxW="4xl">
          {activeForm === 'create' && (
            <>
              <Heading as="h3" textStyle="h3" mb={4}>
                Criar Post
              </Heading>
              <CreatePostForm />
            </>
          )}

          {activeForm === 'update' && (
            <>
              <Heading as="h3" textStyle="h3" mb={4}>
                Atualizar Post
              </Heading>
              Formulário de atualização em breve...
            </>
          )}

          {activeForm === 'delete' && (
            <>
              <Heading as="h3" textStyle="h3" mb={4}>
                Deletar Post
              </Heading>
              Formulário de deleção em breve...
            </>
          )}
        </Flex>
      </Flex>
    </Flex>
  );
}
