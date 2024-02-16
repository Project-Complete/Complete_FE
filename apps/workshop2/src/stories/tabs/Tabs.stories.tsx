import type { Meta } from '@storybook/react';

import { TabList, Tab, Tabs, TabsPanel } from '@team-complete/complete-ui';

const meta = {
  title: 'Buttons/Tabs',
  component: Tabs,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `Tabs로 전체를 감싸줍니다. 그 다음 TabList는 각 탭의 제목들을 설정해주면 됩니다.
            Tab은 해당 항목의 제목을 의미합니다. value를 넣어주면 해당 각 제목의 값들이 설정 되게 됩니다.
            TabPanel은 설정된 value의 값과 동일한 경우 자신의 자식들을 화면에 출력하도록 합니다.
            자세한 내용은 해당 링크 참조 https://mantine.dev/core/tabs/`,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {},
} satisfies Meta<typeof Tabs>;

export default meta;

export const Exam = () => (
  <Tabs>
    <TabList>
      <Tab value='test'>test</Tab>
      <Tab value='test2'>test2</Tab>
      <Tab value='test3'>test3</Tab>
    </TabList>
    <TabsPanel value='test'>hello</TabsPanel>
    <TabsPanel value='test2'>안녕</TabsPanel>
    <TabsPanel value='test3'>hi!</TabsPanel>
  </Tabs>
);
