import '@mantine/core/styles.css';
import '@team-complete/complete-ui/style.css';
import './style.scss';
import '@mantine/carousel/styles.css';
import '@mantine/dropzone/styles.css';

import type { Metadata } from 'next';
import { ColorSchemeScript } from '@mantine/core';
import Provider from './(provider)/Provider';

export const metadata: Metadata = {
  title: '찰랑',
  description: '술, 안주의 믹서기',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return (
    <html lang='ko'>
      <head>
        <ColorSchemeScript />
        <link rel='shortcut icon' href='/favicon.ico' />
        <meta
          name='viewport'
          content='minimum-scale=1, initial-scale=1, width=device-width, user-scalable=no'
        />
      </head>
      <body>
        <Provider>{children}</Provider>
      </body>
    </html>
  );
}
