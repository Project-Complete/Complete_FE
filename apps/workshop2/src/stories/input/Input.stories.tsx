import type { Meta } from '@storybook/react';

import { Input } from '@team-complete/complete-ui';

const meta = {
  title: 'Input/Input',
  component: Input,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `자세한 내용은 https://mantine.dev/core/text-input/`,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    textColor: {
      description: `내부 컬러를 변경할 때 사용합니다.`,
      options: [`black`, `orange`, `red`],
      control: { type: 'select' },
      defaultValue: `black`,
    },
  },
} satisfies Meta<typeof Input>;

export default meta;

export const InputBlack = ({
  textColor = 'black',
}: {
  textColor?: 'black' | 'orange' | 'red';
}) => <Input textColor={textColor} />;

export const InputOrange = ({
  textColor = 'orange',
}: {
  textColor?: 'black' | 'orange' | 'red';
}) => <Input textColor={textColor} />;

export const InputRed = ({
  textColor = 'red',
}: {
  textColor?: 'black' | 'orange' | 'red';
}) => <Input textColor={textColor} />;
