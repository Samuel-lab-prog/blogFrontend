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
	type?: string;
}

export function FormField<T extends FieldValues>({
	control,
	name,
	label,
	required,
	error,
	as = 'input',
	rows,
	type,
}: Props<T>) {
	const Component = as === 'textarea' ? Textarea : Input;

	return (
		<Field.Root
			required={required}
			invalid={!!error}
		>
			<Field.Label>
				{label}
				{required && <Field.RequiredIndicator />}
			</Field.Label>

			<Controller
				name={name}
				control={control}
				render={({ field }) => (
					<Component
						rows={as === 'textarea' ? rows : undefined}
						type={type}
						value={field.value ?? ''}
						onChange={(e) => {
							field.onChange(e.target.value);
						}}
					/>
				)}
			/>

			<Field.ErrorText>{error?.message?.toString()}</Field.ErrorText>
		</Field.Root>
	);
}
