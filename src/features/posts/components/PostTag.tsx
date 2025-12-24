/* eslint-disable @typescript-eslint/no-explicit-any */
import { chakra } from '@chakra-ui/react';

const Component = chakra('span');

export function Tag({ children, ...props }: any) {
  return <Component {...props}>{children}</Component>;
}
