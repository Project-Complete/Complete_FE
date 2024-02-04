import type { Meta } from '@storybook/react';

import { ChipButton } from '@team-complete/complete-ui';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: 'Buttons/ChipButton',
  component: ChipButton,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      description:
        'full: 색이 꽉 차있음, outline: 보더만 있음, ghost: 배경 없음, 보더 없음',
      options: ['full', 'outline', `ghost`],
      control: { type: 'select' },
      defaultValue: 'full',
    },
    background: {
      description: 'white: 흰색 배경, primary: 주요 색상, none: 모든 색상 없음',
      options: ['white', 'primary', `none`],
      control: { type: 'select' },
      defaultValue: 'primary',
    },
  },
} satisfies Meta<typeof ChipButton>;

export default meta;
// type Story = StoryObj<typeof meta>;

export const Full = ({
  variant = 'full',
  background = 'primary',
}: {
  variant?: 'full' | 'outline' | `ghost`;
  background?: `white` | `primary` | `none`;
}) => (
  <ChipButton background={background} variant={variant}>
    test
  </ChipButton>
);

export const Outline = ({
  variant = 'outline',
  background = 'white',
}: {
  variant?: 'full' | 'outline' | `ghost`;
  background?: `white` | `primary` | `none`;
}) => (
  <ChipButton background={background} variant={variant}>
    test
  </ChipButton>
);

export const BackgroundWhite = ({
  background = 'white',
  variant = 'full',
}: {
  variant?: 'full' | 'outline' | `ghost`;
  background?: `white` | `primary` | `none`;
}) => (
  <ChipButton variant={variant} background={background}>
    test
  </ChipButton>
);

export const BackgroundGhost = ({
  background = 'white',
  variant = 'ghost',
}: {
  variant?: 'full' | 'outline' | `ghost`;
  background?: `white` | `primary` | `none`;
}) => (
  <ChipButton variant={variant} background={background}>
    test
  </ChipButton>
);

export const BackgroundPrimary = ({
  background = 'primary',
  variant = 'full',
}: {
  background?: `white` | `primary` | `none`;
  variant?: 'full' | 'outline' | `ghost`;
}) => (
  <ChipButton variant={variant} background={background}>
    test
  </ChipButton>
);

export const BackgroundNone = ({
  background = 'none',
  variant = 'full',
}: {
  background?: `white` | `primary` | `none`;
  variant?: 'full' | 'outline' | `ghost`;
}) => (
  <ChipButton variant={variant} background={background}>
    test
  </ChipButton>
);
