import HeaderWrapper from '@/components/header/HeaderWrapper';
import Footer from '@/components/footer/Footer';
import React from 'react';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return (
    <>
      <HeaderWrapper />
      {children}
      <Footer />
    </>
  );
}
