import { defineConfig } from 'vite';
import { extname, relative, resolve } from 'path';
import { fileURLToPath } from 'node:url';
import { glob } from 'glob';
import react from '@vitejs/plugin-react';
import dts from 'vite-plugin-dts';
import svgr from '@svgr/rollup';

// // https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [react()],
//   build: {
//     // copyPublicDir: false,
//     lib: {
//       entry: resolve(__dirname, 'index.ts'),
//       formats: ['es'],
//     },
//     rollupOptions: {
//       external: ['react', 'react/jsx-runtime'],
//       output: {
//         globals: {
//           react: 'React',
//         },
//       },
//     },
//   },
// });

export default defineConfig({
  plugins: [react(), dts()],
  build: {
    lib: {
      entry: resolve(__dirname, 'index.ts'),
      formats: ['es', 'cjs'],
    },
    rollupOptions: {
      external: ['react', 'react/jsx-runtime'],
      output: {
        globals: {
          react: 'React',
        },
      },
    },
  },
});
