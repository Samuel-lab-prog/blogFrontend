import {
  createSystem,
  defaultConfig,
  defineConfig,
  defineTokens,
  defineSemanticTokens,
} from "@chakra-ui/react"

// Not using aliases here to make sure the generated types work correctly
import { textStyles } from "./text-styles";
import { layerStyles } from "./layer-styles";
import { animationStyles } from "./animation-styles";

// Need to add conditional tokens later to implement dark mode. Read chakra docs for more info.
const tokens = defineTokens({
  colors: {
    gray: {
      50: { value: "#F9FAFB" },
      200: { value: "#E5E7EB" },
      500: { value: "#6B7280" },
      700: { value: "#374151" },
    },
    red: {
      200: { value: "#FCA5A5" },
    },
    yellow: {
      200: { value: "#FDE68A" },
    },
  },

})

export const semanticTokens = defineSemanticTokens({
  colors: {
    warning: {
      value: "{colors.yellow.200}",
    },
    danger: {
      value: "{colors.red.200}",
    },
    bg: {
      light: { value: "{colors.gray.200}" },
      dark: { value: "{colors.gray.700}" },
    },
    text: {
      light: { value: "{colors.gray.300}" },
      dark: { value: "{colors.gray.700}"}
    }
  },
})


const config = defineConfig({
  globalCss: {
    html: {
      scrollBehavior: "smooth",
    },
    body: {
      bg: "bg.light",
    },
    "*": {
      color: "text.dark",
    },
  },
  theme: {
    textStyles,
    layerStyles,
    animationStyles,
    tokens,
    semanticTokens,
  },

})

export const system = createSystem(defaultConfig, config)
