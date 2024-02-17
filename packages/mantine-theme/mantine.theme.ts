import {
  MantineColorsTuple,
  MantineThemeOverride,
  createTheme,
  rem,
} from '@mantine/core';

const primaryColor: MantineColorsTuple = [
  `#E1D8F4`,
  `#C3B1E9`,
  `#A589DF`,
  `#8762D4`,
  `#693BC9`,
  `#542FA1`,
  `#3F2379`,
  `#2A1850`,
  `#150C28`,
  `#000`,
];

const subColor: MantineColorsTuple = [
  `#F9DDE0`,
  `#F3BAC1`,
  `#ED98A2`,
  `#E77583`,
  `#E15364`,
  `#B44250`,
  `#87323C`,
  `#5A2128`,
  `#2D1114`,
  `#000`,
];

const likeColor: MantineColorsTuple = [
  `#FF7A7A`,
  `#000`,
  `#000`,
  `#000`,
  `#000`,
  `#000`,
  `#000`,
  `#000`,
  `#000`,
  `#000`,
];

const bookMarkColor: MantineColorsTuple = [
  `#F6CE9E`,
  `#000`,
  `#000`,
  `#000`,
  `#000`,
  `#000`,
  `#000`,
  `#000`,
  `#000`,
  `#000`,
];

export const theme: MantineThemeOverride = createTheme({
  fontSizes: {
    xl4: rem(40),
    xl3: rem(28),
    xl2: rem(24),
    xl: rem(20),
    lg: rem(18),
    base: rem(16),
    sm: rem(14),
    xs: rem(12),
  },
  lineHeights: {
    xl2: '3.125',
    xl: '3',
    lg: '2.5',
    md: '2',
    sm: '1.875',
    xs: '1.5',
  },
  colors: {
    primaryColor,
    subColor,
    likeColor,
    bookMarkColor,
  },
});
