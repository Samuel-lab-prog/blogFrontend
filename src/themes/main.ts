import { createSystem, defaultConfig, defineConfig } from '@chakra-ui/react';

import { animationStyles, textStyles, layerStyles } from './index';

const config = defineConfig({
	globalCss: {
		html: {
			scrollBehavior: 'smooth',
		},
		body: {
			bg: 'gray.200',
			color: 'gray.700',
		},
		'*': {
			color: 'gray.700',
		},
	},
	theme: {
		tokens: {},
		semanticTokens: {
			colors: {
				background: {
					DEFAULT: { value: 'gray.200' },
					light: { value: 'gray.200' },
					dark: { value: 'gray.800' },
				},
				text: {
					DEFAULT: { value: 'gray.700' },
					light: { value: 'gray.700' },
					dark: { value: 'gray.200' },
				},
			},
		},
		layerStyles,
		textStyles,
		animationStyles,
	},
});

export const system = createSystem(defaultConfig, config);
