import { Box } from '@chakra-ui/react';

type TagProps = {
	children: React.ReactNode;
	variant?: 'solid' | 'outline' | 'subtle';
	colorScheme?: 'gray' | 'red' | 'blue' | 'green' | 'yellow' | 'purple';
	size?: 'sm' | 'md' | 'lg';
} & React.ComponentProps<typeof Box>;

export function Tag({
	children,
	variant = 'subtle',
	colorScheme = 'gray',
	size = 'md',
	...props
}: TagProps) {
	const variants = {
		solid: {
			bg: `${colorScheme}.300`,
			color: 'gray.700',
		},
		outline: {
			bg: 'transparent',
			borderWidth: '1px',
			borderColor: `${colorScheme}.300`,
			color: `${colorScheme}.300`,
		},
		subtle: {
			bg: `${colorScheme}.300`,
			color: `${colorScheme}.800`,
		},
	};

	const sizes = {
		sm: { px: 2, py: 0.5, fontSize: '12px' },
		md: { px: 3, py: 1, fontSize: '14px' },
		lg: { px: 4, py: 2, fontSize: '16px' },
	};

	return (
		<Box
			display='inline-flex'
			alignItems='center'
			justifyContent='center'
			borderRadius='md'
			fontWeight='medium'
			{...variants[variant]}
			{...sizes[size]}
			{...props}
		>
			{children}
		</Box>
	);
}
