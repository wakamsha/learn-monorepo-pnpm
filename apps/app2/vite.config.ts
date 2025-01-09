import react from '@vitejs/plugin-react';
import path from 'node:path';
import { defineConfig } from 'vite';

export default defineConfig({
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  root: path.resolve(import.meta.dirname, './'),
  server: {
    port: 3001,
    open: true,
  },
  plugins: [react()],
});
