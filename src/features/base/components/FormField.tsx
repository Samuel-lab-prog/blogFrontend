/* eslint-disable @typescript-eslint/no-explicit-any */
import { Field, Input, Textarea } from '@chakra-ui/react';
import {
  Controller,
  type Control,
  type FieldErrors,
  type FieldValues,
  type Path,
} from 'react-hook-form';

interface Props<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  label: string;
  required?: boolean;
  error?: FieldErrors<T>;
  as?: 'input' | 'textarea';
  rows?: number;
  disabled?: boolean;
  setValueAs?: (value: any) => any;
}

export function FormField<T extends FieldValues>({
  control,
  name,
  label,
  required,
  error,
  as = 'input',
  rows,
  setValueAs,
  ...rest
}: Props<T>) {
  const Component = as === 'textarea' ? Textarea : Input;

  return (
    <Field.Root required={required} invalid={!!error}>
      <Field.Label>
        {label}
        {required && <Field.RequiredIndicator />}
      </Field.Label>

      <Controller
        name={name}
        control={control}
        render={({ field }) =>
          setValueAs ? (
            <Component
              {...field}
              {...rest}
              rows={as === 'textarea' ? rows : undefined}
              onChange={(e) =>
                field.onChange(setValueAs(e.target.value))
              }
            />
          ) : (
            <Component
              {...field}
              {...rest}
              rows={as === 'textarea' ? rows : undefined}
            />
          )
        }
      />

      <Field.ErrorText>{error?.message?.toString()}</Field.ErrorText>
    </Field.Root>
  );
}
