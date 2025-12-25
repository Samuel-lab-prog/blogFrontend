import { Box } from '@chakra-ui/react';

type TagProps = {
	children: React.ReactNode;
} & React.ComponentProps<typeof Box>;

export function Tag({ children, ...props }: TagProps) {
	return (
		<Box
			display='inline-flex'
			alignItems='center'
			justifyContent='center'
			borderRadius='md'
			px={3}
			py={1}
			textStyle='description'
			fontWeight='bolder'
			bg='gray.300'
			{...props}
		>
			{children}
		</Box>
	);
}
