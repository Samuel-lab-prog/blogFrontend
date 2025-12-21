import { defineRecipe } from '@chakra-ui/react';
import type { RecipeVariantProps } from '@chakra-ui/react';

export const tagRecipe = defineRecipe({
  base: {
    display: 'inline-flex',
    alignItems: 'center',
    bg: 'gray.300',
    textStyle: 'sm',

    px: 3,
    py: 1,
    borderRadius: 'md',

    fontSize: 'sm',
    fontWeight: 'medium',

    whiteSpace: 'nowrap',
  },
});

export type TagProps = RecipeVariantProps<typeof tagRecipe> & {
  children: React.ReactNode;
};
