import { defineConfig } from 'vite';
import { resolve } from 'path';
import react from '@vitejs/plugin-react';
import dts from 'vite-plugin-dts';

export default defineConfig({
  plugins: [react(), dts({ copyDtsFiles: true })],
  // assetsInclude: ['./src/assets**/*.jpg'],
  resolve: {
    alias: {
      '@': '/src',
    },
  },
  build: {
    lib: {
      entry: resolve(__dirname, './index.ts'),
      formats: ['es', 'cjs'],
    },
    rollupOptions: {
      external: ['react', '@mantine/core', '@mantine/hooks'],
      output: {
        globals: {
          react: 'React',
          ['@mantine/core']: '@mantine/core',
          ['@mantine/hooks']: '@mantine/hooks',
        },
      },
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import "@repo/mantine-theme/_mantine.scss";`,
      },
    },
  },
});
