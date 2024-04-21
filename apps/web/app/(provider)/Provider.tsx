'use client';
import { MantineProvider, Autocomplete } from '@mantine/core';
import { theme } from '@repo/mantine-theme';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import localFont from 'next/font/local';
import React, { useState } from 'react';
import AutocompleteCss from './Autocomplete.module.scss';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

export const pretendard = localFont({
  src: './../../public/fonts/PretendardVariable.woff2',
  display: 'swap',
});

const Provider = ({ children }: { children: React.ReactNode }) => {
  const [queryClient] = useState(
    new QueryClient({
      defaultOptions: {
        queries: {
          staleTime: 60 * 1000,
        },
      },
    }),
  );
  return (
    <MantineProvider
      theme={{
        ...theme,
        fontFamily: pretendard.style.fontFamily,
        headings: {
          fontFamily: pretendard.style.fontFamily,
        },
        components: {
          Autocomplete: Autocomplete.extend({ classNames: AutocompleteCss }),
        },
      }}
    >
      <QueryClientProvider client={queryClient}>
        {children}
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </MantineProvider>
  );
};
export default Provider;
