import swc from 'vite-plugin-swc-transform';
import tsconfigPaths from 'vite-tsconfig-paths';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    environment: 'node',
    setupFiles: ['./src/__tests__/setup.ts'],
  },
  plugins: [
    tsconfigPaths(),
    swc({
      swcOptions: {
        jsc: {
          target: 'es2022',
          transform: {
            legacyDecorator: true,
            decoratorMetadata: true,
            useDefineForClassFields: false,
          },
          // externalHelpers: true,
        },
      },
    }),
  ],
});
