import {
  createSystem,
  defaultConfig,
  defineConfig,
} from "@chakra-ui/react"

import {
  animationStyles,
  textStyles,
  layerStyles
} from './index'

const config = defineConfig({
  globalCss: {
    html: {
      scrollBehavior: 'smooth',
    },
    body: {
      bg: 'gray.200',
      color: 'gray.700',
    },
    "*": {
      color: 'gray.700',
    }
  },
  theme: {
    tokens: {
      colors: {},
    },
    layerStyles,
    textStyles,
    animationStyles,
  },
})

export const system = createSystem(defaultConfig, config)

