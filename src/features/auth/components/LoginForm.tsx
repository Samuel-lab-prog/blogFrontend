import {
  Flex,
  Input,
  Field,
  Button,
  Text,
} from '@chakra-ui/react';

import { useLoginForm } from '@features/auth';

type LoginFormProps = {
  className?: string;
};

export function LoginForm({ className }: LoginFormProps) {
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
      className={className}
    >
      {generalError && (
        <Text color="red.500" fontSize="sm" mb={2}>
          {generalError}
        </Text>
      )}

      <Field.Root required invalid={!!errors.email}>
        <Field.Label>E-mail</Field.Label>
        <Input
          placeholder="Digite seu e-mail"
          {...register('email')}
        />
        <Field.ErrorText>{errors.email?.message}</Field.ErrorText>
      </Field.Root>

      <Field.Root required invalid={!!errors.password}>
        <Field.Label>Senha</Field.Label>
        <Input
          type="password"
          placeholder="Digite sua senha"
          {...register('password')}
        />
        <Field.ErrorText>{errors.password?.message}</Field.ErrorText>
      </Field.Root>

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
