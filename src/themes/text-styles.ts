import { defineTextStyles } from '@chakra-ui/react';

export const textStyles = defineTextStyles({
	body: {
		value: {
			fontFamily: 'system-ui, sans-serif',
			fontWeight: '400',
			fontSize: ['sm', undefined, 'md', undefined, 'lg', undefined],
			lineHeight: ['tall', 'tall', 'shorter', 'shorter', 'short'],
			letterSpacing: '0',
			textDecoration: 'none',
			textTransform: 'none',
			overflowWrap: 'break-word',
		},
	},
	description: {
		description: 'The description text style - used in descriptions',
		value: {
			fontFamily: 'system-ui, sans-serif',
			fontWeight: '400',
			fontSize: ['xs', undefined, undefined, 'sm'],
			lineHeight: ['tall', 'tall', 'shorter', 'shorter'],
			letterSpacing: '0',
			textDecoration: 'none',
			textTransform: 'none',
			overflowWrap: 'break-word',
		},
	},
	h1: {
		value: {
			fontFamily: 'system-ui, sans-serif',
			fontWeight: '700',
			fontSize: ['2xl', '3xl', '4xl', '5xl'],
			lineHeight: ['short', 'short', 'shorter', 'shortest'],
			letterSpacing: '-0.02em',
			textDecoration: 'none',
			textTransform: 'none',
			overflowWrap: 'break-word',
		},
	},
	h2: {
		value: {
			fontFamily: 'system-ui, sans-serif',
			fontWeight: '700',
			fontSize: ['xl', '2xl', '3xl', '4xl'],
			lineHeight: ['short', 'short', 'shorter', 'shorter'],
			letterSpacing: '-0.015em',
			textDecoration: 'none',
			textTransform: 'none',
			overflowWrap: 'break-word',
		},
	},
	h3: {
		value: {
			fontFamily: 'system-ui, sans-serif',
			fontWeight: '600',
			fontSize: ['lg', 'xl', '2xl', '3xl'],
			lineHeight: ['short', 'short', 'shorter', 'shorter'],
			letterSpacing: '-0.01em',
			textDecoration: 'none',
			textTransform: 'none',
			overflowWrap: 'break-word',
		},
	},
	h4: {
		value: {
			fontFamily: 'system-ui, sans-serif',
			fontWeight: '600',
			fontSize: ['md', 'lg', 'xl', '2xl'],
			lineHeight: ['short', 'short', 'short', 'shorter'],
			letterSpacing: '-0.005em',
			textDecoration: 'none',
			textTransform: 'none',
			overflowWrap: 'break-word',
		},
	},
	h5: {
		value: {
			fontFamily: 'system-ui, sans-serif',
			fontWeight: '500',
			fontSize: ['sm', 'md', 'lg', 'xl'],
			lineHeight: ['short', 'short', 'short', 'short'],
			letterSpacing: '0',
			textDecoration: 'none',
			textTransform: 'none',
			overflowWrap: 'break-word',
		},
	},
	h6: {
		value: {
			fontFamily: 'system-ui, sans-serif',
			fontWeight: '500',
			fontSize: ['xs', 'sm', 'md', 'lg'],
			lineHeight: ['short', 'short', 'short', 'short'],
			letterSpacing: '0.01em',
			textDecoration: 'none',
			textTransform: 'uppercase',
			overflowWrap: 'break-word',
		},
	},
});
