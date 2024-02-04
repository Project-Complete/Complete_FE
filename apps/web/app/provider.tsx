import { MantineProvider } from '@mantine/core';
import { theme } from '@repo/mantine-theme';
import localFont from 'next/font/local';
import React from 'react';

export const pretendard = localFont({
  src: './../public/fonts/PretendardVariable.woff2',
  display: 'swap',
});

const Provider = ({ children }: { children: React.ReactNode }) => {
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
      {children}
    </MantineProvider>
  );
};
export default Provider;
