import { Flex, Button, Text } from '@chakra-ui/react';
import { useCreatePostForm } from '@features/admin';
import { FormField, SelectField } from '@features/base';

export function CreatePostForm() {
  const {
    handleSubmit,
    formState: { errors, isValid },
    onSubmit,
    isPending,
    generalError,
    control,
  } = useCreatePostForm();

  return (
    <Flex
      as="form"
      w="full"
      direction="column"
      gap={6}
      onSubmit={handleSubmit(onSubmit)}
    >
      {generalError && <Text color="red.500">{generalError}</Text>}

      <FormField
        label="Título"
        required
        error={errors.title}
        control={control}
        name="title"
      />

      <FormField
        label="Resumo"
        required
        as="textarea"
        control={control}
        name="excerpt"
        error={errors.excerpt}
      />

      <FormField
        label="Conteúdo (Markdown)"
        required
        as="textarea"
        rows={10}
        control={control}
        name="content"
        error={errors.content}
      />

      <FormField
        label="Tags"
        control={control}
        name="tags"
        setValueAs={(v) =>
          typeof v === 'string'
            ? v
                .split(',')
                .map((tag) => tag.trim())
                .filter((tag) => tag.length > 0)
            : []
        }
        error={errors.tags}
      />

      <SelectField
        label="Status"
        name="status"
        control={control}
        options={[
          { value: 'draft', label: 'Rascunho' },
          { value: 'published', label: 'Publicado' },
        ]}
        error={errors.status}
        required
      />

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
