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
      description: 'full: 색이 꽉 차있음, outline: 보더만 있음',
      options: ['full', 'outline'],
      control: { type: 'select' },
      defaultValue: 'full',
    },
    background: {
      description: 'white: 흰색 배경, primary: 주요 색상',
      options: ['white', 'primary'],
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
  variant?: 'full' | 'outline';
  background?: `white` | `primary`;
}) => (
  <ChipButton background={background} variant={variant}>
    test
  </ChipButton>
);

export const Outline = ({
  variant = 'outline',
  background = 'white',
}: {
  variant?: 'full' | 'outline';
  background?: `white` | `primary`;
}) => (
  <ChipButton background={background} variant={variant}>
    test
  </ChipButton>
);

export const BackgroundWhite = ({
  background = 'white',
  variant = 'full',
}: {
  variant?: 'full' | 'outline';
  background?: `white` | `primary`;
}) => (
  <ChipButton variant={variant} background={background}>
    test
  </ChipButton>
);

export const BackgroundPrimary = ({
  background = 'primary',
  variant = 'full',
}: {
  background?: `white` | `primary`;
  variant?: 'full' | 'outline';
}) => (
  <ChipButton variant={variant} background={background}>
    test
  </ChipButton>
);
