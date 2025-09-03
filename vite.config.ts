import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import path from 'path';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, '.', '');
  return {
    base: '/', // важно для GitHub Pages в корне
    plugins: [
      react(),
      tailwindcss(),
      
    ],
    define: {
      'process.env.GOOGLE_SHEETS_CREDENTIALS': JSON.stringify(env.GOOGLE_SHEETS_CREDENTIALS),
      'process.env.GOOGLE_SHEETS_ID': JSON.stringify(env.GOOGLE_SHEETS_ID),
      'process.env.GOOGLE_SHEETS_RANGE': JSON.stringify(env.GOOGLE_SHEETS_RANGE)
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      }
    }
  };
});