'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactNode } from 'react';
import { Toaster } from 'react-hot-toast';

//using tanstack to submit client side requests
//have to wrap our components to do that

interface Props {
  children?: ReactNode;
}

const queryClient = new QueryClient();

//we have to tell nextjs that children is of type ReactNode
const QueryWrapper = ({ children }: Props) => {
  return (
    <QueryClientProvider client={queryClient}>
      <Toaster />
      {children}
    </QueryClientProvider>
  );
};

export default QueryWrapper;
