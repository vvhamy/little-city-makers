// Bundles src/ into dist/ (index.html + app.js + styles.css). Run: npm install && npm run build
import { build } from 'esbuild';
import { copyFileSync, mkdirSync } from 'node:fs';
import { resolve } from 'node:path';

mkdirSync('dist', { recursive: true });
await build({
  entryPoints: ['src/main.jsx'],
  bundle: true,
  format: 'iife',
  target: 'es2020',
  outfile: 'dist/app.js',
  jsxFactory: 'React.createElement',
  jsxFragment: 'React.Fragment',
  alias: {
    react: resolve('shims/react.js'),
    'react-dom/client': resolve('shims/react-dom-client.js'),
  },
  logLevel: 'info',
});
copyFileSync('src/styles.css', 'dist/styles.css');
copyFileSync('index.html', 'dist/index.html');
