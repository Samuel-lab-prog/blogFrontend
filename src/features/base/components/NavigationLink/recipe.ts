import { defineRecipe } from '@chakra-ui/react';
import type { RecipeVariantProps } from '@chakra-ui/react';

export const recipe = defineRecipe({
  base: {
    display: 'inline-flex',
    alignItems: 'center',
    textDecoration: 'none',
    cursor: 'pointer',

    color: 'gray.800',

    _hover: {
      textDecoration: 'underline',
    },

    '&[aria-current="page"]': {
      fontWeight: 'bold',
      color: 'gray.800',
      textDecoration: 'underline',
      textUnderlineOffset: '4px',
    },
  },

  variants: {
    variant: {
      solid: {
        bg: 'red.200',
        color: 'white',
        borderRadius: 'md',

        _hover: {
          bg: 'red.300',
        },

        '&[aria-current="page"]': {
          bg: 'red.400',
        },
      },

      outline: {
        borderWidth: '1px',
        borderColor: 'red.200',
        borderRadius: 'md',

        _hover: {
          bg: 'red.50',
        },
      },
    },

    size: {
      sm: {
        p: 2,
        fontSize: 'sm',
      },

      lg: {
        p: 4,
        fontSize: 'lg',
      },
    },
  },

  defaultVariants: {
    size: 'sm',
  },
});

export type NavigationLinkProps = RecipeVariantProps<typeof recipe> & {
  to: string;
  children: React.ReactNode;
  onClick?: () => void;
};
