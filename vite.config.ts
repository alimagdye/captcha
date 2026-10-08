import { defineConfig } from 'vite';

export default defineConfig({
  server: {
    port: 3000,
    open: false,
  },
  build: {
    lib: {
      entry: './src/index.ts',
      name: 'RotationCaptcha',
      fileName: (format) => `captcha.${format}.js`,
      formats: ['es', 'umd'],
    },
    rollupOptions: {
      output: {
        exports: 'named',
        assetFileNames: 'captcha.[ext]',
      },
    },
  },
  test: {
    environment: 'jsdom',
    globals: true,
  },
});
