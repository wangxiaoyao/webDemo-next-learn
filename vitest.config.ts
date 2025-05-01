// <reference types="vitest" />
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react-swc';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

export default defineConfig({
  plugins: [react()],
  // 让 Vitest 只扫描 src 目录，可自行调整
  test: {
    include: ['src/**/*.{test,spec}.{ts,tsx}'],
    environment: 'jsdom',
    globals: true,
    setupFiles: './vitest.setup.ts',
    coverage: {
      provider: 'v8',
      reporter: ['text', 'lcov', 'text-summary'],
    },
  },
  // 可选：给 @/ alias
  resolve: {
    alias: {
      '@/': `${resolve(dirname(fileURLToPath(import.meta.url)), 'src')}/`,
    },
  },
});
