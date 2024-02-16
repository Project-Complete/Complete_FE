'use client';
import { MantineProvider } from '@mantine/core';
import { theme } from '@repo/mantine-theme';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import localFont from 'next/font/local';
import React, { useState } from 'react';

export const pretendard = localFont({
  src: './../public/fonts/PretendardVariable.woff2',
  display: 'swap',
});

const Provider = ({ children }: { children: React.ReactNode }) => {
  const [queryClient] = useState(new QueryClient());
  return (
    <MantineProvider
      theme={{
        ...theme,
        fontFamily: pretendard.style.fontFamily,
        headings: {
          fontFamily: pretendard.style.fontFamily,
        },
      }}
    >
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </MantineProvider>
  );
};
export default Provider;
