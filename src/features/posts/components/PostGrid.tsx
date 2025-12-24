import { Grid } from '@chakra-ui/react';
import type { ReactNode } from 'react';

type PostGridProps = {
  children: ReactNode;
};

export function PostGrid({ children }: PostGridProps) {
  return (
    <Grid
      templateColumns={[
        '1fr', // mobile
        undefined, // sm
        '1fr 1fr', // md
        undefined, // lg
        undefined, // xl
        '1fr 1fr 1fr 1fr', // 2xl
      ]}
      gap={2}
    >
      {children}
    </Grid>
  );
}
