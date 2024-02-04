import type { Meta } from '@storybook/react';

import { Dropdown } from '@team-complete/complete-ui';

const meta = {
  title: 'Buttons/Dropdown',
  component: Dropdown,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `자세한 내용은 해당 링크 참조 https://mantine.dev/core/select/`,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    data: {
      description:
        'data를 통해 select 항목을 넣을 수 있습니다. 해당 항목은 배열 형태나 key와 value가 있는 객체 형태 또한 가능합니다. ex) [`react`,`vue`] 혹은 [  { value: `react`, label: `React` },{ value: `ng`, label: `Angular` },]',
    },
  },
} satisfies Meta<typeof Dropdown>;

export default meta;

export const Exam = () => (
  <Dropdown data={['react', 'vue', 'angular']}></Dropdown>
);
