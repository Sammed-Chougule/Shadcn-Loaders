import path from 'path';
import { defineConfig, loadEnv, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import fs from 'node:fs';

// Ship the shadcn registry files alongside the built site so the SPA rewrite
// in vercel.json does not shadow them (Vercel resolves real files first).
const copyRegistryFiles = (): Plugin => ({
  name: 'copy-registry-files',
  closeBundle() {
    const outDir = path.resolve(__dirname, 'dist');
    const files: Array<[string, string]> = [
      ['registry.json', 'registry.json'],
      ['loader.json', 'loader.json'],
      ['registry/loader.tsx', 'registry/loader.tsx'],
    ];
    for (const [from, to] of files) {
      const src = path.resolve(__dirname, from);
      const dest = path.resolve(outDir, to);
      fs.mkdirSync(path.dirname(dest), { recursive: true });
      fs.copyFileSync(src, dest);
    }
  },
});

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, '.', '');
    return {
      server: {
        port: 3000,
        host: '0.0.0.0',
      },
      plugins: [react(), tailwindcss(), copyRegistryFiles()],
      resolve: {
        alias: {
          '@': path.resolve(__dirname, '.'),
        }
      }
    };
});
