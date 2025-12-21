import {
  Flex,
  Input,
  Textarea,
  Field,
  NativeSelect,
  Button,
  Text,
} from '@chakra-ui/react';

import { usePostForm } from '@features/admin';

export function CreatePostForm({
  className,
}: {
  className?: string;
}) {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid },
    onSubmit,
    isPending,
    generalError,
  } = usePostForm();

  const statusValue = watch('status');

  return (
    <Flex
      as="form"
      w="full"
      onSubmit={handleSubmit(onSubmit)}
      direction="column"
      gap={6}
      className={className}
    >
      {generalError && <Text color="red.500">{generalError}</Text>}

      <Field.Root required invalid={!!errors.title}>
        <Field.Label>
          Título <Field.RequiredIndicator />
        </Field.Label>
        <Input
          placeholder="Digite o título do post"
          {...register('title')}
        />
        <Field.ErrorText>{errors.title?.message}</Field.ErrorText>
      </Field.Root>

      <Field.Root required invalid={!!errors.excerpt}>
        <Field.Label>
          Resumo <Field.RequiredIndicator />
        </Field.Label>
        <Textarea
          placeholder="Digite um breve resumo"
          {...register('excerpt')}
        />
        <Field.ErrorText>{errors.excerpt?.message}</Field.ErrorText>
      </Field.Root>

      <Field.Root required invalid={!!errors.content}>
        <Field.Label>
          Conteúdo (Markdown) <Field.RequiredIndicator />
        </Field.Label>
        <Textarea
          rows={10}
          placeholder="Escreva o conteúdo completo em Markdown"
          variant="outline"
          {...register('content')}
        />
        <Field.ErrorText>{errors.content?.message}</Field.ErrorText>
      </Field.Root>

      <Field.Root>
        <Field.Label>Tags</Field.Label>
        <Input
          placeholder="Ex: Tecnologia, React"
          {...register('tags', {
            setValueAs: (v) =>
              typeof v === 'string'
                ? v
                    .split(',')
                    .map((t) => t.trim())
                    .filter(Boolean)
                : [],
          })}
        />
      </Field.Root>

      <Field.Root required>
        <Field.Label>
          Status <Field.RequiredIndicator />
        </Field.Label>
        <NativeSelect.Root>
          <NativeSelect.Field {...register('status')}>
            <option
              style={{ backgroundColor: 'white' }}
              value="draft"
            >
              Rascunho
            </option>
            <option
              style={{ backgroundColor: 'white' }}
              value="published"
            >
              Publicado
            </option>
          </NativeSelect.Field>
        </NativeSelect.Root>

        <Text textStyle="sm" mt={1}>
          {statusValue === 'draft'
            ? 'O post será salvo como rascunho e não ficará visível publicamente.'
            : 'O post será publicado e ficará visível para todos os usuários.'}
        </Text>
      </Field.Root>

      {/* Botão */}
      <Button
        type="submit"
        variant="surface"
        colorPalette="gray"
        disabled={!isValid}
        loading={isPending}
        w="full"
        mt={4}
      >
        Criar Post
      </Button>
    </Flex>
  );
}
