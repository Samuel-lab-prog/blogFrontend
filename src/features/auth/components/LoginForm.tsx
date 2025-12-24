import { Flex, Button, Text } from '@chakra-ui/react';
import { useLoginForm } from '@features/auth';
import { FormField } from '@features/base';

export function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    onSubmit,
    loading,
    generalError,
  } = useLoginForm();

  return (
    <Flex
      as="form"
      onSubmit={handleSubmit(onSubmit)}
      direction="column"
      align="center"
      gap={2}
      w="full"
      maxW="md"
    >
      {generalError && (
        <Text color="red.500" fontSize="sm" mb={2}>
          {generalError}
        </Text>
      )}

      <FormField
        label="E-mail"
        required
        placeholder="Digite seu e-mail"
        {...register('email')}
        error={errors.email?.message}
      />

      <FormField
        label="Senha"
        required
        type="password"
        placeholder="Digite sua senha"
        {...register('password')}
        error={errors.password?.message}
      />

      <Button
        type="submit"
        variant="surface"
        disabled={!isValid}
        loading={loading}
        mt={6}
        w="full"
      >
        Entrar
      </Button>
    </Flex>
  );
}
