import type { Meta } from '@storybook/react';

import { Button } from '@team-complete/complete-ui';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: 'Buttons/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      description:
        'size 옵션을 통해 버튼의 크기를 조정할 수 있습니다. md 혹은 lg로 할 수 있습니다.',
      options: ['lg', 'md'],
      control: { type: 'select' },
      defaultValue: 'md',
    },
    variant: {
      description: '배경과 border를 변경할 수 있습니다.',
      options: ['primary', 'outline', 'white-primary', 'white'],
      control: { type: 'select' },
      defaultValue: 'primary',
    },
  },
} satisfies Meta<typeof Button>;

export default meta;
// type Story = StoryObj<typeof meta>;

export const Middle = ({
  size = 'md',
  variant = 'primary',
}: {
  size?: 'md' | 'lg';
  variant?: `primary` | `outline` | 'white-primary' | 'white';
}) => (
  <Button size={size} variant={variant}>
    test
  </Button>
);

export const Large = ({
  size = 'lg',
  variant = 'primary',
}: {
  size?: 'md' | 'lg';
  variant?: 'primary' | `outline` | 'white-primary' | 'white';
}) => (
  <Button size={size} variant={variant}>
    테스트 버튼
  </Button>
);
