import { chakra } from '@chakra-ui/react';
import { tagRecipe, type TagProps } from './recipe';

const Component = chakra('span', tagRecipe);

export function Tag ({ children, ...props }: TagProps) {
  return <Component {...props}>{children}</Component>;
};
