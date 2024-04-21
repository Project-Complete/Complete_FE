import HeaderLoginWrapper from '@/components/header/HeaderLoginWrapper';
import React from 'react';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return (
    <>
      <HeaderLoginWrapper />
      {children}
    </>
  );
}
