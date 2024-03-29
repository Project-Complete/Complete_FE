import '@mantine/core/styles.layer.css';
import type { Metadata } from 'next';
import { ColorSchemeScript } from '@mantine/core';
import HeaderWrapper from '../components/header';
import Provider from './Provider';
import Footer from '@/components/footer/Footer';
import './style.scss';
import '@team-complete/complete-ui/style.css';

export const metadata: Metadata = {
  title: 'Create Turborepo',
  description: 'Generated by create turbo',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return (
    <html lang='en'>
      <head>
        <ColorSchemeScript />
        <link rel='shortcut icon' href='/favicon.ico' />
        <meta
          name='viewport'
          content='minimum-scale=1, initial-scale=1, width=device-width, user-scalable=no'
        />
      </head>
      <body>
        <Provider>
          <HeaderWrapper />
          {children}
          <Footer />
        </Provider>
      </body>
    </html>
  );
}
