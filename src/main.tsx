import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from "@components/ui/provider"
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import App from './App.tsx';
import { system } from '@themes/index.ts';
import { ChakraProvider } from '@chakra-ui/react';

const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <Provider>
        <ChakraProvider value={system}>
          <App />
        </ChakraProvider>
      </Provider>
    </QueryClientProvider>
  </StrictMode>
);
