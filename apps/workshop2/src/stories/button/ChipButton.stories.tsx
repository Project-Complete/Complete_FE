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
      options: ['primary', 'gray'],
      control: { type: 'select' },
      defaultValue: 'primary',
    },
  },
} satisfies Meta<typeof ChipButton>;

export default meta;
// type Story = StoryObj<typeof meta>;

export const Full = ({ variant = 'primary' }: { variant?: 'primary'|'gray' }) => (
  <ChipButton variant={variant}>test</ChipButton>
);


