import { Field, NativeSelect } from '@chakra-ui/react';
import {
	Controller,
	type Control,
	type FieldErrors,
	type FieldValues,
	type Path,
} from 'react-hook-form';

interface Option {
	value: string;
	label: string;
}

interface SelectFieldProps<T extends FieldValues> {
	control: Control<T>;
	name: Path<T>;
	label: string;
	options: Option[];
	error?: FieldErrors<T>;
	required?: boolean;
	placeholder?: string;
	disabled?: boolean;
}

export function SelectField<T extends FieldValues>({
	control,
	name,
	label,
	options,
	error,
	required,
	disabled,
	placeholder,
}: SelectFieldProps<T>) {
	return (
		<Field.Root
			required={required}
			invalid={!!error}
			w='full'
		>
			<Field.Label>
				{label}
				{required && <Field.RequiredIndicator />}
			</Field.Label>

			<Controller
				disabled={disabled}
				name={name}
				control={control}
				render={({ field }) => (
					<NativeSelect.Root>
						<NativeSelect.Field
							value={field.value ?? ''}
							onChange={(e) => field.onChange(e.target.value)}
						>
							{placeholder && (
								<option
									value=''
									disabled
								>
									{placeholder}
								</option>
							)}

							{options.map((option) => (
								<option
									key={option.value}
									value={option.value}
									style={{ backgroundColor: 'white' }}
								>
									{option.label}
								</option>
							))}
						</NativeSelect.Field>
					</NativeSelect.Root>
				)}
			/>

			<Field.ErrorText>{error?.message?.toString()}</Field.ErrorText>
		</Field.Root>
	);
}
