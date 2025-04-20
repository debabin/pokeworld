import { TanStackRouterVite } from '@tanstack/router-plugin/vite';
import react from '@vitejs/plugin-react-swc';
import vue from '@vitejs/plugin-vue'
import path from 'node:path';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [
    TanStackRouterVite({
      generatedRouteTree: './generated/router/index.ts'
    }) as any,
    vue(),
    react()
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@/generated': path.resolve(__dirname, './generated')
    }
  }
});
