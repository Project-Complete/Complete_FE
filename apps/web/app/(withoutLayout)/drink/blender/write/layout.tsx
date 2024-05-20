import HeaderLoginWrapper from '@/components/header/HeaderLoginWrapper';
import { Divider } from '@mantine/core';
import React from 'react';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return (
    <>
      <HeaderLoginWrapper />
      <Divider />
      {children}
    </>
  );
}
