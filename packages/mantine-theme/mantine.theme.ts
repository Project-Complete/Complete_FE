import { Button, MantineThemeOverride, createTheme, rem } from '@mantine/core';
export const theme: MantineThemeOverride = createTheme({
  fontSizes: {
    '4xl': rem(40),
    '3xl': rem(28),
    '2xl': rem(24),
    xl: rem(20),
    lg: rem(18),
    base: rem(16),
    sm: rem(14),
    xs: rem(12),
  },
  lineHeights: {
    '2xl': '3.125',
    xl: '3',
    lg: '2.5',
    md: '2',
    sm: '1.875',
    xs: '1.5',
  },
});
