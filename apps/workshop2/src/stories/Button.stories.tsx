import type { Meta, StoryObj } from '@storybook/react';

// import { Button } from "./a";
import { StyledButton as Button } from '@team-complete/complete-ui';
import classes from './button.module.css';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: 'Example/Button',
  component: Button,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {
    // backgroundColor: { control: "color" },
  },
} satisfies Meta<typeof Button>;

export default meta;
// type Story = StoryObj<typeof meta>;

export const Size = () => <Button size={`md`}>test</Button>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
// export const Primary: Story = {
//   args: {
//     // primary: true,
//     children: 'Button',
//     className:`classes.storybookButtonTest`
//   },
// };

// export const Secondary: Story = {
//   args: {
//     label: "Button",
//   },
// };

// export const Large: Story = {
//   args: {
//     size: "large",
//     label: "Button",
//   },
// };

// export const Small: Story = {
//   args: {
//     size: "small",
//     label: "Button",
//   },
// };
