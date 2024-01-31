import type { Preview } from '@storybook/react';
import '@manthine/core/styles.css';

import { MantineProvider} from '@mantine/core/esm/index.mjs';
import { theme } from '@repo/mantine-theme/mantine.theme';

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;

export const decorators = [
  (renderStory: any) => (<MantineProvider theme={{ ...theme }}> {renderStory()} </MantineProvider>)
];