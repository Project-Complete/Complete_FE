import HeaderWrapper from '@/components/header/HeaderWrapper';
import Footer from '@/components/footer/Footer';
import React from 'react';
import { cookies } from 'next/headers';

export default function Layout({
  children,
}: {
  children: React.ReactNode;
  }): JSX.Element {
    const cookieStore = cookies();
    const accessToken = cookieStore.get('access_token');
  return (
    <>
      <HeaderWrapper isLogin={accessToken === undefined ? false : true} />
      {children}
      <Footer />
    </>
  );
}
