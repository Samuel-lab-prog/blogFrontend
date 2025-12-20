import { defineRecipe } from "@chakra-ui/react";
import type { RecipeVariantProps } from "@chakra-ui/react";

export const recipe = defineRecipe({
  base: {
    display: "inline-flex",
    alignItems: "center",

    px: 2,
    py: 1,
    borderRadius: "md",

    fontSize: "sm",
    fontWeight: "medium",

    whiteSpace: "nowrap",
  },

  variants: {
    variant: {
      solid: {
        bg: "gray.200",
        color: "gray.800",
      },

      outline: {
        borderWidth: "1px",
        borderColor: "gray.300",
        color: "gray.700",
      },

      subtle: {
        bg: "gray.100",
        color: "gray.600",
      },
    },

    size: {
      sm: {
        px: 2,
        py: 1,
        fontSize: "xs",
      },

      md: {
        px: 3,
        py: 1.5,
        fontSize: "sm",
      },
    },
  },

  defaultVariants: {
    variant: "subtle",
    size: "sm",
  },
});

export type Props = RecipeVariantProps<typeof recipe> & {
  children: React.ReactNode;
};
