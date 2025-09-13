import path from 'path';
import { defineConfig, loadEnv } from 'vite';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  
  return {
    base: './', // Use relative paths for assets
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      }
    },
    define: {
      __APP_ENV__: JSON.stringify(env.APP_ENV || 'development'),
    },
    server: {
      port: 5173,
      strictPort: true,
      host: true
    },
    build: {
      outDir: 'dist',
      assetsDir: 'assets',
      rollupOptions: {
        output: {
          manualChunks: {
            vendor: ['react', 'react-dom'],
            utils: ['./src/utils/cache.ts', './src/utils/errors.ts'],
          }
        }
      }
    },
    preview: {
      port: 4173,
      strictPort: true,
      host: true
    }
  };
});